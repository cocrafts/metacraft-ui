import React, { FC, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Hyperlink from 'components/Hyperlink';
import Markdown from 'components/Markdown';
import Text from 'components/Text';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
} from 'utils/state/modal';
import { themeState } from 'utils/state/theme';
import { useSnapshot } from 'valtio';

import Popup from './Popup';

export const HomeScreen: FC = () => {
	const [checked, setChecked] = useState(true);
	const containerRef = useRef<View>(null);
	const { colors } = useSnapshot(themeState);
	const containerStyle = { backgroundColor: colors.background };

	const showPopup = () => {
		modalActions.show({
			id: 'Cloud Le',
			component: Popup,
			bindingDirection: BindDirections.Inner,
			animateDirection: AnimateDirections.TopRight,
			bindingRef: containerRef,
			maskStyle: {
				backgroundColor: 'transparent',
			},
			positionOffset: {
				x: 0,
				y: 8,
			},
			context: { name: 'Cloud' },
		});
	};

	return (
		<View style={[styles.container, containerStyle]}>
			<View ref={containerRef}>
				<Text>Referenced Area</Text>
			</View>
			<Hyperlink title="A link should notify itself as interact-able when hovered!" />
			<Button
				outline
				style={styles.buttonContainer}
				onPress={showPopup}
				title="Show popup"
			/>
			<Checkbox
				style={{ marginTop: 20 }}
				selected={checked}
				onSelect={(val) => setChecked(val)}
			/>
			<Markdown style={styles.markdownContainer} content={markdownContent} />
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContainer: {
		marginTop: 20,
	},
	markdownContainer: {
		padding: 18,
		borderRadius: 8,
		marginTop: 20,
	},
});

const markdownContent = `this \`is\` a **universal markdown** area!

with new line, and [link](https://stormgate.io)..

# h1
## h2
### h3
#### h4
##### h5
###### h6
`;
