module.exports = {
	'presets': [
		[
			'@babel/env',
			{
				'modules': false,
				'useBuiltIns': 'usage',
				'corejs':3
			}
		]
	],
	'plugins': [
		'@babel/plugin-external-helpers',
		[
			'@babel/plugin-transform-runtime',
			{
				'useESModules': false
			}
		],
		[
			'babel-plugin-import',
			{
				'libraryName': 'lodash',
				'libraryDirectory': '',
				'camel2DashComponentName': false  // default: true
			}
		],
		'module:gogoend-babel-false-flag-condition-removal-plugin'
	]
};