const setEnvironments = (configs, { webpack }) => {
	const { DefinePlugin } = webpack;

	configs.plugins[0] = new DefinePlugin({
		process: { env: {} },
	});

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
	webpackConfigs: [setEnvironments, splitBundle],
	moduleAlias: () => {
		return {
			global: {
				'react-native': 'react-native-web',
			},
		};
	},
};
