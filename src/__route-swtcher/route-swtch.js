define(function (require, exports, module) {

	var swtch    = require('swtch'),
		backbone = require('lowercase-backbone');

	// direct reference to the _extractParameters method
	var _extractParameters = backbone.router.prototype._extractParameters;

	var routeSwtch = module.exports = swtch.extend({

		/**
		 * Override 'execCase' method.
		 */
		execCase: function routeSwtchExecCase(c_se, query) {

			var route    = c_se.condition,
				callback = c_se.value,
				context  = c_se.context;

			if (route === 'default') {
				// not a route, just the default behaviour
				// simply execute the function
				callback.call(context, query);
			} else {
				// a route
				// extract paramteters
				var args = _extractParameters(route, query);

				return callback.apply(context, args);
			}
		},
	});

});
