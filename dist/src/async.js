"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = async;
function async(instance) {
  var _this = this;

  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return new Promise(function (resolve, reject) {
    // Handler to handle promises
    function handler(data) {
      var _instance$next = instance.next(data),
          value = _instance$next.value,
          next = _instance$next.next,
          done = _instance$next.done;
      // When done notify all subscribers that we are done


      if (done) {
        resolve(value);
        return;
      }
      // There is no handling for non promise compatible interfaces, yet...
      value.then(function (res) {
        handler(res);
      }, function (err) {
        return console.log(err);
      }).catch(function (e) {
        return reject(e);
      });
    }
    // Kick off the sequence
    handler.apply(_this, args);
  });
}