import { FunctionComponent, RefObject } from 'react';
import { LayoutRectangle, View } from 'react-native';

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

export interface PositionOffset {
	x?: number;
	y?: number;
}

export interface ModalConfigs {
	id?: string;
	bindingRectangle?: LayoutRectangle;
	bindingDirection?: BindDirections;
	animateDirection?: AnimateDirections;
	component: FunctionComponent;
	positionOffset?: PositionOffset;
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
