import fs from 'fs';

function async(instance, ...args) {
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

function getFileContents(folder) {
  return new Promise((resolve, reject) => {
    fs.readdir(folder, (err, names) => err ? reject(err) : resolve(names))
  })
}

function isDirectory(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stat) => err ? reject(err) : resolve(stat.isDirectory()))
  })
}

function *getTags(baseFolder) {
  const items = yield getFileContents(baseFolder);
  let tags = {};
  for (var i = 0; i < items.length; i++) {
    let item = items[i]
    const isDir = yield isDirectory(`${baseFolder}/${item}`)
    if (isDir) {
      const childTags = yield tagLoader(`${baseFolder}/${item}`)
      tags = { ...tags, ...childTags }
    } else {
      tags[item] = require(`${baseFolder}/${item}`)
    }
  }
  return tags
}

export default function tagLoader(baseFolder) {
  return async(getTags(baseFolder))
}
