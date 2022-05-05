import React, { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import Carousel from '../../components/Carousel';

import BackToHome from './BackToHome';

const carouselContent: ReactNode[] = [<BackToHome key={1} />];

export const Animation: FC = () => {
	return (
		<View style={styles.container}>
			<Carousel>{carouselContent}</Carousel>
		</View>
	);
};

export default Animation;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
