import renderer from 'react-test-renderer';

import 'react-native';

import App from '../src/app';

it('renders correctly', () => {
	renderer.create(<App />);
});
