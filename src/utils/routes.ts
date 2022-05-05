import { LinkingOptions } from '@react-navigation/native';

export type ScreenParamList = {
	Home: undefined;
	Animation: undefined;
};

export const linking: LinkingOptions<ScreenParamList> = {
	prefixes: ['https://card.stormgate.io'],
	// initialRouteName: 'home',
	config: {
		screens: {
			Home: 'home',
			Animation: 'animation',
		},
	},
};
