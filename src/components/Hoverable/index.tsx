import {
	Children,
	cloneElement,
	FC,
	ReactChild,
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
import { isHoverEnabled } from 'components/Hoverable/shared';

export interface Props {
	style?: StyleProp<ViewStyle>;
	useHoveredStyle?: (
		isHovered: SharedValue<boolean>,
	) => AnimatedStyleProp<ViewStyle>;
	onHoverIn?: () => void;
	onHoverOut?: () => void;
	onPressIn?: () => void;
	onPressOut?: () => void;
	children: NonNullable<ReactChild>;
}

type OptionalFunc = undefined | (() => void);

export const Hoverable: FC<Props> = ({
	style,
	useHoveredStyle,
	onHoverIn,
	onHoverOut,
	onPressIn,
	onPressOut,
	children,
}) => {
	const showHover = useSharedValue(true);
	const isHovered = useSharedValue(false);
	const hoveredStyle = useHoveredStyle?.(isHovered);

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

	const webProps = Platform.select({
		default: {},
		web: {
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
			onResponderGrant: handleGrant,
			onResponderRelease: handleRelease,
		},
	});

	return cloneElement(Children.only(children) as never, {
		...webProps,
		style: [style, hoveredStyle],
		onPressIn: handleGrant,
		onPressOut: handleRelease,
	});
};

export default Hoverable;
