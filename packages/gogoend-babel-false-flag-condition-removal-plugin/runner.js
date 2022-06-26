const { transformSync } = require('@babel/core');
const path = require('path');

const code = `
console.log('gogoend running');

if (DEBUG) {
  let a = 100
  console.warn(a, 'gogoend debugging')
}
`;

const babelPlugin = {
	plugins: [path.resolve(__dirname, './index.js')]
};

const output = transformSync(code, babelPlugin);
console.warn(output.code);