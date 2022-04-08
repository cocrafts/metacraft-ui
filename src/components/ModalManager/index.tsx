import React, { FC, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSnapshot } from 'valtio';

import { modalActions, modalState } from '../../utils/store/modal';

import ModalContainer from './ModalContainer';

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
});

export const ModalManager: FC = () => {
	const containerRef = useRef<View>(null);
	const { hashmap } = useSnapshot(modalState);
	const instances = Object.values(hashmap);

	useEffect(() => {
		modalActions.setContainerRef(containerRef);
	}, []);

	return (
		<View ref={containerRef} pointerEvents="none" style={styles.container}>
			{instances.map((item) => {
				return <ModalContainer key={item.id} item={item} />;
			})}
		</View>
	);
};

export default ModalManager;

export * from './shared';
