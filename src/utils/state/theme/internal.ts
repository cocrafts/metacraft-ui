import { proxy } from 'valtio';

export interface ThemeSizes {
	topNavigation: number;
	leftNavigation: number;
}

export interface ThemeColors {
	primary: string;
	background: string;
	text: string;
	alt: string;
}

export interface ThemeState {
	id: string;
	colors: ThemeColors;
	sizes: ThemeSizes;
}

export const themeState = proxy<ThemeState>({
	id: 'fantasy',
	colors: {
		primary: '#2C879B',
		background: '#002E46',
		text: '#FFFFFF',
		alt: '#FFFFFF',
	},
	sizes: {
		topNavigation: 70,
		leftNavigation: 70,
	},
});
