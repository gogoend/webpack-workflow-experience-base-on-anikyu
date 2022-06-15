module.exports = ({ types: t}) => {
  return {
    visitor: {
      // 标识符
      Identifier (path) {
        console.log(path.node.name)
        console.log('Identifier')

        const parentIsIf = t.isIfStatement(path.parentPath)
        const isGogoend = path.node.name === 'GOGOEND'
        console.log(parentIsIf, isGogoend)

        // 检查当前节点是否满足父节点为if语句且node.name（判断条件）是否为GOGOEND标识符
        if (
          parentIsIf &&
          isGogoend
        ) {
          // 把标识符转换字符串字面量 - 即把示例中的GOGOEND转换为‘GOGOEND’
          const stringNode = t.stringLiteral('GOGOEND')

          path.replaceWith(
            stringNode
          )
        }
      },
      StringLiteral(path) {
        const parentIsIf = t.isIfStatement(path.parentPath)
        const isGogoend = path.node.value === 'GOGOEND'
        if (isGogoend && parentIsIf) {
          path.parentPath.remove()
        }
      }
    }
  }
}