module.exports = {
	'env': {
		'browser': true,
		'es6': true,
		'node': true
	},
	'extends': 'eslint:recommended',
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'space-before-function-paren': 1,
		'space-infix-ops': 1,
		'spaced-comment': 1
	},
	"parser": "@typescript-eslint/parser",
	"plugins": [
		// TODO: @typescript-eslint/eslint-plugin 可以被注释；那么它的作用是什么？
		// "@typescript-eslint/eslint-plugin"
	]
};