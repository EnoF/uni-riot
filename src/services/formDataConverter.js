export function addValueTo(value, key, object) {

}

export function prepareObjectForKey(object, key = '') {
  const keys = key.split('.')
  const { length } = keys
  keys.splice(0, length - 1)
    .reduce((resolvedObject, key) => getOrCreate(resolvedObject, key), object)
}

function getOrCreate(value, key) {
  return value[key] = value[key] || {}
}
