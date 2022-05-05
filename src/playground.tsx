import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
	createStackNavigator,
	StackNavigationOptions,
} from '@react-navigation/stack';
import Provider from 'components/Provider';
import ComponentExpo from 'screens/ComponentExpo';
import Home from 'screens/Home';
import { linking } from 'utils/routes';
const Stack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
	headerShown: false,
	animationEnabled: false,
};

export const Playground: FC = () => {
	return (
		<Provider>
			<NavigationContainer linking={linking}>
				<Stack.Navigator screenOptions={screenOptions}>
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="Expo" component={ComponentExpo} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
};

export default Playground;
