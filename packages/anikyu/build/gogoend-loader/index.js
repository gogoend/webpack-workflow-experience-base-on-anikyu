module.exports = function(source, map, meta) {
  console.log(this, source, map, meta)

  return source;
}