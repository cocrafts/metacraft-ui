import { proxy } from 'valtio';

export interface ModalConfigs {
	id?: string;
}

export interface ModalState {
	count: number;
	hashmap: Record<string, ModalConfigs>;
}

export const modalState = proxy<ModalState>({
	count: 0,
	hashmap: {
		default: {
			id: 'default',
		},
		user: {
			id: 'user',
		},
	},
});

export const modalActions = {
	show: (configs: ModalConfigs): void => {
		const modalId = configs.id || 'default';
		modalState.hashmap[modalId] = configs;
	},
	hide: (id: string): void => {
		delete modalState.hashmap[id];
	},
};
