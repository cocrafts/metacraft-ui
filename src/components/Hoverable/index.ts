import {
	Children,
	cloneElement,
	FC,
	MouseEvent,
	ReactNode,
	useCallback,
	useRef,
} from 'react';
import { Platform, StyleProp, ViewStyle } from 'react-native';
import {
	AnimatedStyleProp,
	SharedValue,
	useAnimatedReaction,
	useSharedValue,
} from 'react-native-reanimated';

import { isHoverEnabled } from './helper';

export interface Props {
	style?: StyleProp<ViewStyle>;
	animatedStyle?: (
		isHovered: SharedValue<boolean>,
	) => AnimatedStyleProp<ViewStyle>;
	onHoverIn?: () => void;
	onHoverOut?: () => void;
	onMouseMove?: (e: MouseEvent) => void;
	onPressIn?: () => void;
	onPressOut?: () => void;
	children: ReactNode;
}

type OptionalFunc = undefined | (() => void);

export const Hoverable: FC<Props> = ({
	style,
	animatedStyle,
	onHoverIn,
	onHoverOut,
	onMouseMove,
	onPressIn,
	onPressOut,
	children,
}) => {
	const showHover = useSharedValue(true);
	const isHovered = useSharedValue(false);

	const hoverIn = useRef<OptionalFunc>(() => onHoverIn?.());
	const hoverOut = useRef<OptionalFunc>(() => onHoverOut?.());
	const pressIn = useRef<OptionalFunc>(() => onPressIn?.());
	const pressOut = useRef<OptionalFunc>(() => onPressOut?.());

	hoverIn.current = onHoverIn;
	hoverOut.current = onHoverOut;
	pressIn.current = onPressIn;
	pressOut.current = onPressOut;

	useAnimatedReaction(
		() => Platform.OS === 'web' && showHover.value && isHovered.value,
		(hovered, previousHovered) => {
			if (hovered !== previousHovered) {
				if (hovered && hoverIn.current) {
					hoverIn.current();
				} else if (hoverOut.current) {
					hoverOut.current();
				}
			}
		},
		[],
	);

	const handleMouseEnter = useCallback(() => {
		if (isHoverEnabled() && !isHovered.value) {
			isHovered.value = true;
		}
	}, [isHovered]);

	const handleMouseLeave = useCallback(() => {
		if (isHovered.value) {
			isHovered.value = false;
		}
	}, [isHovered]);

	const handleGrant = useCallback(() => {
		showHover.value = false;
		pressIn.current?.();
	}, [showHover]);

	const handleRelease = useCallback(() => {
		showHover.value = true;
		pressOut.current?.();
	}, [showHover]);

	const platformProps = Platform.select({
		default: {},
		web: {
			style: [style, animatedStyle?.(isHovered)],
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
			onMouseMove,
			onResponderGrant: handleGrant,
			onResponderRelease: handleRelease,
		},
	});

	return cloneElement(Children.only(children) as never, {
		...platformProps,
		onPressIn: handleGrant,
		onPressOut: handleRelease,
	});
};

export default Hoverable;
