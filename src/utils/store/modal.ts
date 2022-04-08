import { FunctionComponent, RefObject } from 'react';
import { LayoutRectangle, View } from 'react-native';
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
}

export interface ModalConfigs {
	id?: string;
	bindingRectangle?: LayoutRectangle;
	bindingDirection?: BindDirections;
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
	if (!targetRef?.current) return Promise.resolve(undefined);

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
			console.log(layout, '<--');
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
