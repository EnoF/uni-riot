// Directly execute all required modules
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext)
}

// Expose all tags to riot after they are all available
requireAll(require.context('./src/tags', true, /\.tag$/))

require('./src/example/app.scss')

var riot = require('riot')

riot.mount('base-page', {
  riot: riot
})
