'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertFormData = convertFormData;
exports.addValueTo = addValueTo;

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function convertFormData() {
  var formData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();

  var result = {};
  formData.forEach(function (value, query) {
    return addValueTo(value, query, result);
  });
  return result;
}

function addValueTo(value, query, object) {
  var _query$split$reverse = query.split('.').reverse(),
      _query$split$reverse2 = _toArray(_query$split$reverse),
      lastKey = _query$split$reverse2[0],
      keys = _query$split$reverse2.slice(1);

  var parentOfLastKey = keys.reverse().reduce(function (result, key) {
    return getOrCreateAndSet(result, key);
  }, object);
  parentOfLastKey[lastKey] = value;
}

function getOrCreateAndSet(value, key) {
  return value[key] = value[key] || {};
}