export default function async(instance, ...args) {
  return new Promise((resolve, reject) => {
    // Handler to handle promises
    function handler(data) {
      const { value, next, done } = instance.next(data)
      // When done notify all subscribers that we are done
      if (done) {
        resolve(value)
        return
      }
      // There is no handling for non promise compatible interfaces, yet...
      value.then(res => {
        handler(res)
      }, err => console.log(err)).catch(e => reject(e))
    }
    // Kick off the sequence
    handler.apply(this, args)
  });
}
