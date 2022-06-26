import('lodash/cloneDeep').then((cloneDeep) => {
	console.log(cloneDeep);

	console.log(11211);
});

declare var GOGOEND: any;

console.log('Ts', 'RUN!!!','GOGOEND!!!');
/**
 * if块最终将被我们所编写的Babel插件删除
 */
// @ts-ignore
if(GOGOEND) {
	console.log('Ts', 'STOP!!!','GOGOEND!!!');
}