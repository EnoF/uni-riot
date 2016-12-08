'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = tagLoader;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _async = require('./async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [getTags].map(regeneratorRuntime.mark);

function getFileContents(folder) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readdir(folder, function (err, names) {
      return err ? reject(err) : resolve(names);
    });
  });
}

function isDirectory(path) {
  return new Promise(function (resolve, reject) {
    _fs2.default.stat(path, function (err, stat) {
      return err ? reject(err) : resolve(stat.isDirectory());
    });
  });
}

function getTags(baseFolder) {
  var items, tags, i, item, isDir, childTags;
  return regeneratorRuntime.wrap(function getTags$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getFileContents(baseFolder);

        case 2:
          items = _context.sent;
          tags = {};
          i = 0;

        case 5:
          if (!(i < items.length)) {
            _context.next = 21;
            break;
          }

          item = items[i];
          _context.next = 9;
          return isDirectory(baseFolder + '/' + item);

        case 9:
          isDir = _context.sent;

          if (!isDir) {
            _context.next = 17;
            break;
          }

          _context.next = 13;
          return tagLoader(baseFolder + '/' + item);

        case 13:
          childTags = _context.sent;

          tags = _extends({}, tags, childTags);
          _context.next = 18;
          break;

        case 17:
          tags[item] = require(baseFolder + '/' + item);

        case 18:
          i++;
          _context.next = 5;
          break;

        case 21:
          return _context.abrupt('return', tags);

        case 22:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function tagLoader(baseFolder) {
  return (0, _async2.default)(getTags(baseFolder));
}