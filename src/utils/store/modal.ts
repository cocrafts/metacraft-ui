import { FunctionComponent } from 'react';
import { proxy } from 'valtio';

export enum BindDirections {
	Top,
	TopLeft,
	TopRight,
	Bottom,
	BottomLeft,
	BottomRight,
	Left,
	LeftTop,
	LeftBottom,
	Right,
	RightTop,
	RightBottom,
}

export interface ModalConfigs {
	id?: string;
	component: FunctionComponent;
	hide?: boolean;
}

export interface ModalState {
	count: number;
	hashmap: Record<string, ModalConfigs>;
}

export const modalState = proxy<ModalState>({
	count: 0,
	hashmap: {},
});

export const modalActions = {
	show: (configs: ModalConfigs): void => {
		const modalId = configs.id || 'default';
		modalState.hashmap[modalId] = configs;
	},
	hide: (id: string): void => {
		modalState.hashmap[id].hide = true;
	},
};
