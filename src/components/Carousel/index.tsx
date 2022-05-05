import React, { FC, ReactChild } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from 'components/Button';

interface PropType {
	children: ReactChild[];
}

export const Carousel: FC<PropType> = (props: PropType) => {
	const { children } = props;

	return (
		<View style={styles.container}>
			<View>
				{children.map((child, index) => (
					<View key={index}>{child}</View>
				))}
			</View>
			<View style={styles.prevButton}>
				<Button title={'Prev'} />
			</View>
			<View style={styles.nextButton}>
				<Button title={'Next'} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	prevButton: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 10,
		justifyContent: 'center',
	},
	nextButton: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 10,
		justifyContent: 'center',
	},
});
