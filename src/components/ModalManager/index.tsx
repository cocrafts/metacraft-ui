import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSnapshot } from 'valtio';

import { modalState } from '../../utils/store/modal';

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
});

export const ModalManager: FC = () => {
	const { hashmap } = useSnapshot(modalState);
	const instances = Object.values(hashmap);

	return (
		<View pointerEvents="box-none" style={styles.container}>
			{instances.map((item) => {
				return <Text key={item.id}>{item.id}</Text>;
			})}
		</View>
	);
};

export default ModalManager;
