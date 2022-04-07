module.exports = {
	source: 'src',
	output: 'lib',
	targets: ['module', ['typescript', { project: 'tsconfig.build.json' }]],
};
