export function addValueTo(value, key, object) {

}

export function prepareObjectForKey(object, keys = []) {
  const { length } = keys
  const clone = { ...object }
  keys.splice(0, length - 1)
    .reduce((resolvedObject, key) =>
      getOrCreateAndSet(resolvedObject, key), clone)
  return clone
}

function getOrCreateAndSet(value, key) {
  return value[key] = value[key] || {}
}
