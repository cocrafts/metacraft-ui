import React, { FC } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useSnapshot } from 'valtio';

import { dimensionState } from '../utils/state/dimension';
import { themeState } from '../utils/state/theme';

export type ScaledSizes = [
	desktop: number,
	tablet?: number,
	smallTablet?: number,
	mobile?: number,
];

type Props = TextProps & {
	style?: TextStyle;
	responsiveSizes?: ScaledSizes;
};

const LightText: FC<Props> = ({ style, ...otherProps }) => {
	const { colors } = useSnapshot(themeState);
	const dynamicStyle = [{ fontFamily: 'Poppins', color: colors.text }, style];

	return <Text style={dynamicStyle} {...otherProps} />;
};

const ScaledText: FC<Props> = ({ style, responsiveSizes, ...otherProps }) => {
	const { colors } = useSnapshot(themeState);
	const { responsiveLevel } = useSnapshot(dimensionState);
	const fontSize = extractSizes(responsiveSizes || [14], responsiveLevel);
	const lineHeightFactor = (fontSize as number) > 20 ? 1.2 : 1.35;

	const dynamicStyle = [
		{
			fontFamily: 'Poppins',
			color: colors.text,
			fontSize,
			lineHeight: (fontSize as number) * lineHeightFactor,
		},
		style,
	];

	return <Text style={dynamicStyle} {...otherProps} />;
};

export const SmartText: FC<Props> = ({ responsiveSizes, ...otherProps }) => {
	if (responsiveSizes) {
		return <ScaledText responsiveSizes={responsiveSizes} {...otherProps} />;
	}

	return <LightText {...otherProps} />;
};

export default SmartText;

const extractSizes = (sizes: ScaledSizes, level: number) => {
	for (let i = level; i >= 0; i -= 1) {
		if (sizes[i]) return sizes[i];
	}
};
