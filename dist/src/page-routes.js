'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;

var _riot = require('riot');

var riot = _interopRequireWildcard(_riot);

var _async = require('./async');

var _async2 = _interopRequireDefault(_async);

var _tagLoader = require('./tag-loader');

var _tagLoader2 = _interopRequireDefault(_tagLoader);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _resolver = require('./resolver');

var _formDataConverter = require('./formDataConverter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function inject(content, templateUrl) {
  var base = _fs2.default.readFileSync(templateUrl, 'utf8');
  return base.replace('{content}', content.toString());
}

function renderPage(state, tags, templateUrl) {
  var tag = riot.render(tags['base-page.tag'], {
    riot: riot,
    state: state
  });
  return inject(tag, templateUrl).replace('<base-page>', '<base-page state=\'{ ' + JSON.stringify(state) + ' }\'>');
}

function register(app) {
  var defaultRoute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';

  var _marked = [mountRoutes].map(regeneratorRuntime.mark);

  var templateUrl = arguments[2];

  if (!templateUrl) throw new Error('No template provided');

  function mountRoutes() {
    var tags;
    return regeneratorRuntime.wrap(function mountRoutes$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _tagLoader2.default)(__dirname + '/tags');

          case 2:
            tags = _context.sent;


            app.get('/:page*?/:details*?/:action*?', function (req, res) {
              var url = (0, _resolver.isServiceRegistered)(req.url) ? req.url : defaultRoute;
              (0, _resolver.resolve)(url, {}).then(function (state) {
                res.send(renderPage(state, tags, templateUrl));
              });
            });

            app.post('/:collection*?/:details*?/:action*?', function (req, res) {
              var formData = new Map(Object.entries(req.body));
              var data = (0, _formDataConverter.convertFormData)(formData);
              (0, _resolver.resolve)(req.url, data).then(function (state) {
                res.send(renderPage(state, tags, templateUrl));
              }, function (error) {
                return res.status(400).send(error);
              });
            });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  (0, _async2.default)(mountRoutes());
}