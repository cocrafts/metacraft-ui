import { proxy } from 'valtio';

export interface ThemeColors {
	primary: string;
	bg: string;
	bgLight: string;
	bgLighter: string;
}

export interface Theme {
	colors: ThemeColors;
}

export const defaultTheme: Theme = {
	colors: {
		primary: '#3772fe',
		bg: '#1b2136',
		bgLight: '#1d2237',
		bgLighter: '#252c48',
	},
};

export const themeState = proxy<Theme>(defaultTheme);
