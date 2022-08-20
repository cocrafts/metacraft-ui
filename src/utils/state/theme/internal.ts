import { proxy } from 'valtio';

export interface ThemeSizes {
	topNavigation: number;
	leftNavigation: number;
}

export interface ThemeColors {
	primary: string;
	background: string;
	card: string;
	border: string;
	notification: string;
	text: string;
	link: string;
	alt: string;
}

export interface ThemeState {
	id: string;
	dark: boolean;
	defaultFontFamily: string;
	colors: ThemeColors;
	sizes: ThemeSizes;
}

export const paperTheme: ThemeState = {
	id: 'paper',
	dark: false,
	defaultFontFamily: 'Poppins',
	colors: {
		primary: '#2C879B',
		background: '#FFFFFF',
		card: '#FFFFFF',
		border: '#D8D8D8',
		notification: '#FF3B30',
		text: '#222222',
		link: '#2C879B',
		alt: '#8f8f9d',
	},
	sizes: {
		topNavigation: 70,
		leftNavigation: 70,
	},
};

export const nightTheme: ThemeState = {
	id: 'night',
	dark: true,
	defaultFontFamily: 'Poppins',
	colors: {
		primary: '#388BDF',
		background: '#0d1117',
		card: '#FFFFFF',
		border: '#D8D8D8',
		notification: '#FF3B30',
		text: '#C9D1D9',
		link: '#58A6FF',
		alt: '#343941',
	},
	sizes: {
		topNavigation: 70,
		leftNavigation: 70,
	},
};

export const fantasyTheme: ThemeState = {
	id: 'fantasy',
	dark: false,
	defaultFontFamily: 'Poppins',
	colors: {
		primary: '#2C879B',
		background: '#002E46',
		card: '#FFFFFF',
		border: '#D8D8D8',
		notification: '#FF3B30',
		text: '#FFFFFF',
		link: '#2C879B',
		alt: '#FFFFFF',
	},
	sizes: {
		topNavigation: 70,
		leftNavigation: 70,
	},
};

export const themeState = proxy<ThemeState>(nightTheme);
