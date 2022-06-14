module.exports = ({ types: t}) => {
  return {
    visitor: {
      // 标识符
      Identifier (path) {
        console.log(path.node.name)
        console.log('Identifier')

        const parentIsIf = t.isIfStatement(path.parentPath)
        const isDebug = path.node.name === 'DEBUG'
        console.log(parentIsIf, isDebug)

        // 检查当前节点是否满足父节点为if语句且node.name（判断条件）是否为DEBUG标识符
        if (
          parentIsIf &&
          isDebug
        ) {
          // TODO:
        }
      }
    }
  }
}