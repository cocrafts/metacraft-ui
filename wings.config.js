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
		}
	};

	return configs;
};


module.exports = {
	webpackConfigs: [
		splitBundle,
	],
	moduleAlias: () => {
		return {
			global: {
				'react-native': 'react-native-web',
			},
		};
	},
};
