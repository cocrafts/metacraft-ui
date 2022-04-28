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
	withoutMask?: boolean;
	hide?: boolean;
}

export type ShowModalConfigs = Omit<
	ModalConfigs,
	'bindingRectangle' | 'hide'
> & {
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

const measure = async (viewRef: RefObject<View>): Promise<LayoutRectangle> =>
	new Promise((resolve) => {
		/* for Android, measure method won't behave well without collapsable = false */
		viewRef.current?.setNativeProps({ collapsable: false });

		setTimeout(() => {
			/* <-- at this point in time, collapsable = false must be ready/configured correctly */
			viewRef.current?.measure((x, y, width, height, px, py) => {
				resolve({ x: px, y: py, width, height });
			});
		}, 0);
	});

const measureRelative = async (
	targetRef?: RefObject<View>,
): Promise<LayoutRectangle | undefined> => {
	if (!targetRef?.current) {
		/* <-- if there is no target, assume relative measure to device screen */
		const { width, height } = Dimensions.get('screen');
		return Promise.resolve({ x: 0, y: 0, width, height });
	}

	/* compute relative position with referenceMap.root */
	const rootLayout = await measure(referenceMap.root);
	const targetLayout = await measure(targetRef);

	return {
		x: targetLayout.x - rootLayout.x,
		y: targetLayout.y - rootLayout.y,
		width: targetLayout.width,
		height: targetLayout.height,
	};
};

export const modalActions = {
	setContainerRef: (ref: RefObject<View>): void => {
		referenceMap.root = ref;
	},
	show: ({ id, bindingRef, ...restConfigs }: ShowModalConfigs): void => {
		const safeId = id || 'default-modal';

		measureRelative(bindingRef).then((layout) => {
			modalState.hashmap[safeId] = {
				id: safeId,
				bindingRectangle: layout,
				...restConfigs,
			};
		});
	},
	hide: (id: string): void => {
		const instance = modalState.hashmap[id];
		if (instance) instance.hide = true;
	},
};
