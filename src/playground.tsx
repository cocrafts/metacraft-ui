import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
	createStackNavigator,
	StackNavigationOptions,
} from '@react-navigation/stack';
import ModalManager from 'components/ModalManager';
import Home from 'screens/Home';
import { linking } from 'utils/routes';
const Stack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
	headerShown: false,
	animationEnabled: false,
};

export const Playground: FC = () => {
	return (
		<NavigationContainer linking={linking}>
			<Stack.Navigator screenOptions={screenOptions}>
				<Stack.Screen name="Home" component={Home} />
			</Stack.Navigator>
			<ModalManager />
		</NavigationContainer>
	);
};

export default Playground;
