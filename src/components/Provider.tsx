import React, { FC, ReactChild, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { modalActions } from '../utils/state/modal';

import ModalManager from './ModalManager';

interface Props {
	children?: ReactChild;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export const Provider: FC<Props> = ({ children }) => {
	const containerRef = useRef<View>(null);

	useEffect(() => {
		modalActions.setContainerRef(containerRef);
	}, []);

	return (
		<View ref={containerRef} style={styles.container}>
			{children}
			<ModalManager />
		</View>
	);
};

export default Provider;
