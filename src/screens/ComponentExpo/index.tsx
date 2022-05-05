import React, { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import Carousel from '../../components/Carousel';

import BackToHome from './BackToHome';
import ShowModal from './ShowModal';

const carouselContent: ReactNode[] = [
	<BackToHome key={1} />,
	<ShowModal key={2} />,
];

export const ComponentExpo: FC = () => {
	return (
		<View style={styles.container}>
			<Carousel>{carouselContent}</Carousel>
		</View>
	);
};

export default ComponentExpo;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
