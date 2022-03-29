const { resolve } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const setEnvironments = (configs, { webpack, wingsConfig }) => {
	const { DefinePlugin } = webpack;
	const env = wingsConfig.env();
	const isProduction = wingsConfig.isProduction(env);

	configs.plugins[0] = new DefinePlugin({
		process: { env: {} },
		__DEV__: !isProduction,
		PUBLIC_URL: JSON.stringify(process.env.PUBLIC_URL || 'master'),
	});

	return configs;
};

const copyAssets = (configs) => {
	configs.plugins.push(
		new CopyPlugin({
			patterns: [{ from: resolve(process.cwd(), 'assets/'), to: './' }],
		}),
	);

	return configs;
};

const splitBundle = (configs) => {
	configs.entry = {
		app: {
			...configs.entry.app,
			dependOn: 'react-core',
		},
		'react-core': {
			import: [
				'react',
				'react-dom',
				'react-native',
				'react-art',
				'@react-native-async-storage/async-storage',
			],
		},
	};

	return configs;
};

module.exports = {
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	webpackConfigs: [setEnvironments, copyAssets, splitBundle],
	moduleAlias: () => {
		return {
			global: {
				'react-native': 'react-native-web',
			},
		};
	},
};
