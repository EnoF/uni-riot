export function addValueTo(value, query, object) {
  const [lastKey, ...keys] = query.split('.').reverse()
  const parentOfLastKey = keys.reverse()
    .reduce((result, key) => getOrCreateAndSet(result, key), object)
  parentOfLastKey[lastKey] = value
}

function getOrCreateAndSet(value, key) {
  return value[key] = value[key] || {}
}
