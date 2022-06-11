import './js/animation';

import './js/button-event';

import { cube } from './js/math';

import helloGogoend from './unidentified-file/hello.gogoend';

console.warn(helloGogoend);

import('./vue/Demo.vue').then((component) => {
	console.log(component);
});

import('lodash/cloneDeep').then((cloneDeep) => {
	console.log(cloneDeep);
});
console.log(cube(1000));
