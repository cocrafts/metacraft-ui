import { LinkingOptions } from '@react-navigation/native';

export type ScreenParamList = {
	Home: undefined;
	Expo: undefined;
};

export const linking: LinkingOptions<ScreenParamList> = {
	prefixes: ['https://card.stormgate.io'],
	config: {
		screens: {
			Home: 'home',
			Expo: 'expo',
		},
	},
};
