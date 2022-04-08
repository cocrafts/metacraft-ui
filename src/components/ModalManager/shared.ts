import { LayoutRectangle, ViewStyle } from 'react-native';
import { interpolate, SharedValue } from 'react-native-reanimated';

import { AnimateDirections, BindDirections } from '../../utils/store/modal';

export const rectangleBind = (
	target: LayoutRectangle,
	current: LayoutRectangle,
	direction?: BindDirections,
	spacing = 15,
): LayoutRectangle => {
	const result: LayoutRectangle = {
		x: target.x + (target.width / 2 - current.width / 2) /* <- middle */,
		y: target.y + (target.height / 2 - current.height / 2) /* <- center */,
		width: current.width,
		height: current.height,
	};

	if (direction === BindDirections.Top) {
		result.x = target.x + (target.width / 2 - current.width / 2);
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
		result.y = target.y + target.height + spacing;
	} else if (direction === BindDirections.BottomRight) {
		result.x = target.x + target.width - current.width;
		result.y = target.y + target.height + spacing;
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
	} else if (direction === BindDirections.InnerTop) {
		result.y = target.y + spacing;
	} else if (direction === BindDirections.InnerTopLeft) {
		result.x = target.x + spacing;
		result.y = target.y + spacing;
	} else if (direction === BindDirections.InnerTopRight) {
		result.x = target.x + target.width - current.width - spacing;
		result.y = target.y + spacing;
	} else if (direction === BindDirections.InnerBottom) {
		result.y = target.y + target.height - current.height - spacing;
	} else if (direction === BindDirections.InnerBottomLeft) {
		result.x = target.x + spacing;
		result.y = target.y + target.height - current.height - spacing;
	} else if (direction === BindDirections.InnerBottomRight) {
		result.x = target.x + target.width - current.width - spacing;
		result.y = target.y + target.height - current.height - spacing;
	} else if (direction === BindDirections.InnerLeft) {
		result.x = target.x + spacing;
		result.y = target.y + (target.height / 2 - current.height / 2);
	} else if (direction === BindDirections.InnerRight) {
		result.x = target.x + target.width - current.width - spacing;
		result.y = target.y + (target.height / 2 - current.height / 2);
	}

	return result;
};

export const rectangleAnimatedStyle = (
	shared: SharedValue<number>,
	direction: AnimateDirections | undefined,
	baseStyle: ViewStyle,
): ViewStyle => {
	const animatedStyle: ViewStyle = {
		transform: [],
		...baseStyle,
	};

	if (direction === AnimateDirections.Top) {
		animatedStyle.transform?.push({
			translateY: interpolate(shared.value, [0, 1], [20, 0]),
		});
	} else if (direction === AnimateDirections.TopLeft) {
		animatedStyle.transform?.push({
			translateY: interpolate(shared.value, [0, 1], [20, 0]),
		});

		animatedStyle.borderTopLeftRadius = interpolate(
			shared.value,
			[0, 1],
			[100, 0],
		);
	} else if (direction === AnimateDirections.TopRight) {
		animatedStyle.transform?.push({
			translateY: interpolate(shared.value, [0, 1], [20, 0]),
		});

		animatedStyle.borderTopRightRadius = interpolate(
			shared.value,
			[0, 1],
			[100, 0],
		);
	} else if (direction === AnimateDirections.Bottom) {
		animatedStyle.transform?.push({
			translateY: interpolate(shared.value, [0, 1], [-20, 0]),
		});
	} else if (direction === AnimateDirections.BottomLeft) {
		animatedStyle.transform?.push({
			translateY: interpolate(shared.value, [0, 1], [-20, 0]),
		});

		animatedStyle.borderBottomLeftRadius = interpolate(
			shared.value,
			[0, 1],
			[100, 0],
		);
	} else if (direction === AnimateDirections.BottomRight) {
		animatedStyle.transform?.push({
			translateY: interpolate(shared.value, [0, 1], [-20, 0]),
		});

		animatedStyle.borderBottomRightRadius = interpolate(
			shared.value,
			[0, 1],
			[100, 0],
		);
	} else if (direction === AnimateDirections.Left) {
		animatedStyle.transform?.push({
			translateX: interpolate(shared.value, [0, 1], [20, 0]),
		});
	} else if (direction === AnimateDirections.Right) {
		animatedStyle.transform?.push({
			translateX: interpolate(shared.value, [0, 1], [-20, 0]),
		});
	} else if (direction === AnimateDirections.Inner) {
		animatedStyle.transform?.push({
			scale: interpolate(shared.value, [0, 1], [0.95, 1]),
		});
	} else {
		animatedStyle.transform?.push({
			translateY: interpolate(shared.value, [0, 1], [-20, 0]),
		});
	}

	return animatedStyle;
};
