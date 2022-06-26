module.exports = (babelLibrary) => {
	const { types: t } = babelLibrary;
	return {
		visitor: {
			// 标识符
			Identifier (path) {
				// console.log(path.node.name)
				// console.log('Identifier')

				const parentIsIf = t.isIfStatement(path.parentPath);
				const isGogoend = path.node.name === 'GOGOEND';

				// 检查当前节点是否满足父节点为if语句且node.name（判断条件）是否为GOGOEND标识符
				if (
					parentIsIf &&
          isGogoend
				) {
					// console.log(babelLibrary)
					console.log('发现了目标代码块：if语句，且其中判断条件为GOGOEND标识符；GOGOEND标识符将被替换为\'GOGOEND\'字符串常量');

					// 把标识符转换字符串字面量 - 即把示例中的GOGOEND转换为‘GOGOEND’
					const stringNode = t.stringLiteral('GOGOEND');

					path.replaceWith(
						stringNode
					);
				}
			},
			StringLiteral (path) {
				const parentIsIf = t.isIfStatement(path.parentPath);
				const isGogoend = path.node.value === 'GOGOEND';
				if (isGogoend && parentIsIf) {
					console.log('发现了目标代码块：if语句，且其中判断条件为\'GOGOEND\'字符串常量；该代码块将被删除');

					path.parentPath.remove();
				}
			}
		}
	};
};