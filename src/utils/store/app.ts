import { proxy } from 'valtio';

export const appState = proxy({
	counter: 0,
});

export const appActions = {
	increaseCounter: (): number => appState.counter++,
};
