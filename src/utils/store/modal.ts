import { FunctionComponent, RefObject } from 'react';
import { Dimensions, LayoutRectangle, View } from 'react-native';
import { proxy } from 'valtio';

export enum BindDirections {
	Top,
	TopLeft,
	TopRight,
	Bottom,
	BottomLeft,
	BottomRight,
	Left,
	LeftTop,
	LeftBottom,
	Right,
	RightTop,
	RightBottom,
	Inner,
	InnerTop,
	InnerTopLeft,
	InnerTopRight,
	InnerBottom,
	InnerBottomLeft,
	InnerBottomRight,
	InnerLeft,
	InnerRight,
}

export enum AnimateDirections {
	Top,
	TopLeft,
	TopRight,
	Bottom,
	BottomLeft,
	BottomRight,
	Left,
	Right,
	Inner,
}

export interface ModalConfigs {
	id?: string;
	bindingRectangle?: LayoutRectangle;
	bindingDirection?: BindDirections;
	animateDirection?: AnimateDirections;
	component: FunctionComponent;
	hide?: boolean;
}

export type ShowModalConfigs = Omit<ModalConfigs, 'bindingRectangle'> & {
	bindingRef?: RefObject<View>;
};

export interface ModalState {
	count: number;
	hashmap: Record<string, ModalConfigs>;
}

export const referenceMap: Record<string, RefObject<View>> = {};

export const modalState = proxy<ModalState>({
	count: 0,
	hashmap: {},
});

const measureLayout = (
	targetRef?: RefObject<View>,
): Promise<LayoutRectangle | undefined> => {
	if (!targetRef?.current) {
		const { width, height } = Dimensions.get('window');
		return Promise.resolve({ x: 0, y: 0, width, height });
	}

	return new Promise((resolve, reject) => {
		targetRef.current?.measureLayout(
			referenceMap.root.current as never,
			(x, y, width, height) =>
				resolve({
					x,
					y,
					width,
					height,
				}),
			() => reject(),
		);
	});
};

export const modalActions = {
	setContainerRef: (ref: RefObject<View>): void => {
		referenceMap.root = ref;
	},
	show: ({ id, bindingRef, ...restConfigs }: ShowModalConfigs): void => {
		const safeId = id || 'default-modal';

		measureLayout(bindingRef).then((layout) => {
			modalState.hashmap[safeId] = {
				id: safeId,
				bindingRectangle: layout,
				...restConfigs,
			};
		});
	},
	hide: (id: string): void => {
		modalState.hashmap[id].hide = true;
	},
};
