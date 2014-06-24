define('__route-swtcher/route-swtch',['require','exports','module','swtch','lowercase-backbone'],function (require, exports, module) {

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

//     RouteSwtch
//     (c) simonfan
//     RouteSwtch is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module RouteSwtch
 */

define('route-swtcher',['require','exports','module','lowercase-backbone','lodash','./__route-swtcher/route-swtch'],function (require, exports, module) {
	

	var backbone = require('lowercase-backbone'),
		_        = require('lodash');

	// swtch builder used specifically for backbone route
	var routeSwtch = require('./__route-swtcher/route-swtch');

	// direct reference to _routeToRegExp method
	var _routeToRegExp     = backbone.router.prototype._routeToRegExp;

	var routeSwtcher = module.exports = backbone.router.extend({
		initialize: function initializeRouteSwtch(options) {

			// initialize router.
			backbone.router.prototype.initialize.apply(this, arguments);

			/**
			 * Array to hold all the swtches to be run whenever the
			 * route changes
			 *
			 * @type {Array}
			 */
			this.swtches = [];

			this.route('*route', this.execSwtches);
		},

		/**
		 * Run the swtches
		 *
		 * @param  {[type]} route [description]
		 * @return {[type]}       [description]
		 */
		execSwtches: function execSwtches(route) {

			_.each(this.swtches, function (swtch) {

				swtch.exec(route);

			}, this);

		},


		swtch: function defineSwtch(routes) {
			// routes:
			// { route: callback }

			// instantiate a swtch
			var rswtch = routeSwtch();

			// add the swtch to the swtches array
			this.swtches.push(rswtch);

			// for each of the routes, define a situation
			_.each(routes, function (callback, route) {

				if (route === 'default') {

					rswtch.when('default', callback);

				} else {
					// not default, thus a route.

					// [1] create a route regexp
					var routeRegExp = _routeToRegExp(route);

					// [2] set situation
					rswtch.when(routeRegExp, callback);
				}
			});

			return this;

		},
	});
});

