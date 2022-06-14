module.exports = () => {
  return {
    visitor: {
      // 标识符
      Identifier (path) {
        console.log(path.node.name)
        console.log('Identifier')
      }
    }
  }
}