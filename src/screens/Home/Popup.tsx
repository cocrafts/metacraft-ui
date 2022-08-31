import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ModalConfigs } from 'utils/state/modal';

const styles = StyleSheet.create({
	container: {
		padding: 18,
		borderRadius: 8,
		backgroundColor: '#FFFFFF',
		width: 250,
		height: 180,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

interface Props {
	config: ModalConfigs;
}

export const Popup: FC<Props> = ({ config }) => {
	const context = config.context as { name: string };

	console.log(config.context);
	return (
		<View style={styles.container}>
			<Text>{context.name}</Text>
		</View>
	);
};

export default Popup;
