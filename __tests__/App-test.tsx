import React from 'react';
import renderer from 'react-test-renderer';

import 'react-native';

import App from '../src/playground';

it('renders correctly', () => {
	renderer.create(<App />);
});
