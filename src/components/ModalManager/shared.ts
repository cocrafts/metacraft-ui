import { LayoutRectangle } from 'react-native';

export enum SnapDirections {
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

export const rectangleBind = (
	target: LayoutRectangle,
	current: LayoutRectangle,
	direction: SnapDirections,
	spacing = 15,
): LayoutRectangle => {
	const result: LayoutRectangle = {
		x: target.x + (target.width / 2 - current.width / 2) /* <- middle */,
		y: target.y + target.height + spacing /* <- bottom */,
		width: current.width,
		height: current.height,
	};

	if (direction === SnapDirections.Top) {
		result.y = target.y - current.height - spacing;
	} else if (direction === SnapDirections.TopLeft) {
		result.x = target.x;
		result.y = target.y - current.height - spacing;
	} else if (direction === SnapDirections.TopRight) {
		result.x = target.x + target.width - current.width;
		result.y = target.y - current.height - spacing;
	} else if (direction === SnapDirections.BottomLeft) {
		result.x = target.x;
	} else if (direction === SnapDirections.BottomRight) {
		result.x = target.x + target.width - current.width;
	} else if (direction === SnapDirections.Left) {
		result.x = target.x - current.width - spacing;
		result.y = target.y + (target.height / 2 - current.height / 2);
	} else if (direction === SnapDirections.LeftTop) {
		result.x = target.x - current.width - spacing;
		result.y = target.y;
	} else if (direction === SnapDirections.LeftBottom) {
		result.x = target.x - current.width - spacing;
		result.y = target.y + target.height - current.height;
	} else if (direction === SnapDirections.Right) {
		result.x = target.x + target.width + spacing;
		result.y = target.y + (target.height / 2 - current.height / 2);
	} else if (direction === SnapDirections.RightTop) {
		result.x = target.x + target.width + spacing;
		result.y = target.y;
	} else if (direction === SnapDirections.RightBottom) {
		result.x = target.x + target.width + spacing;
		result.y = target.y + target.height - current.height;
	}

	return result;
};
