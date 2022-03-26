import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from 'components/Button';
import { appActions, appState } from 'utils/store/app';
import { useSnapshot } from 'valtio';

const styles = StyleSheet.create({
	buttonContainer: {
		marginTop: 20,
	},
});

export const HomeScreen: FC = () => {
	const appSnap = useSnapshot(appState);

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Welcome to Metacraft UI {appSnap.counter}</Text>
			<Text>
				Still too early to have something to show.. but this going to be fun!
			</Text>
			<Button
				style={styles.buttonContainer}
				onPress={() => appActions.increaseCounter()}
			/>
		</View>
	);
};

export default HomeScreen;
