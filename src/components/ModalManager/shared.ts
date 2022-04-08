import { LayoutRectangle } from 'react-native';

import { BindDirections } from '../../utils/store/modal';

export const rectangleBind = (
	target: LayoutRectangle,
	current: LayoutRectangle,
	direction?: BindDirections,
	spacing = 15,
): LayoutRectangle => {
	const result: LayoutRectangle = {
		x: target.x + (target.width / 2 - current.width / 2) /* <- middle */,
		y: target.y + (target.height / 2 - current.height / 2) /* <- bottom */,
		width: current.width,
		height: current.height,
	};

	if (direction === BindDirections.Top) {
		result.y = target.y - current.height - spacing;
	} else if (direction === BindDirections.TopLeft) {
		result.x = target.x;
		result.y = target.y - current.height - spacing;
	} else if (direction === BindDirections.TopRight) {
		result.x = target.x + target.width - current.width;
		result.y = target.y - current.height - spacing;
	} else if (direction === BindDirections.Bottom) {
		result.x = target.x + (target.width / 2 - current.width / 2);
		result.y = target.y + target.height + spacing;
	} else if (direction === BindDirections.BottomLeft) {
		result.x = target.x;
	} else if (direction === BindDirections.BottomRight) {
		result.x = target.x + target.width - current.width;
	} else if (direction === BindDirections.Left) {
		result.x = target.x - current.width - spacing;
		result.y = target.y + (target.height / 2 - current.height / 2);
	} else if (direction === BindDirections.LeftTop) {
		result.x = target.x - current.width - spacing;
		result.y = target.y;
	} else if (direction === BindDirections.LeftBottom) {
		result.x = target.x - current.width - spacing;
		result.y = target.y + target.height - current.height;
	} else if (direction === BindDirections.Right) {
		result.x = target.x + target.width + spacing;
		result.y = target.y + (target.height / 2 - current.height / 2);
	} else if (direction === BindDirections.RightTop) {
		result.x = target.x + target.width + spacing;
		result.y = target.y;
	} else if (direction === BindDirections.RightBottom) {
		result.x = target.x + target.width + spacing;
		result.y = target.y + target.height - current.height;
	}

	return result;
};
