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


			this.mainSwtch = routeSwtch();

			// use backbone.router.prototype.route
			// as we will override it with custom logic.
			backbone.router.prototype.route.call(this, '*route', this.handleRouteEvent);
		},


		/**
		 * Handles 'route' events.
		 *
		 * @param  {[type]} route [description]
		 * @return {[type]}       [description]
		 */
		handleRouteEvent: function handleRouteEvent(route) {

			this.lastRoute = route;

			this.exec(route);
		},

		/**
		 * Run the swtches:
		 * mainSwtch
		 * and swtches
		 *
		 * @param  {[type]} route [description]
		 * @return {[type]}       [description]
		 */
		exec: function exec(route) {

			// if no route is passed, exec the last one
			route = route || this.lastRoute;

			// exec the main swtch
			this.mainSwtch.exec(route);

			// exec the subswtches
			_.each(this.swtches, function (swtch) {

				swtch.exec(route);

			}, this);

		},

		/**
		 * Defines a route onto the main swtch
		 *
		 * @param  {[type]}   route    [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		route: function defineRoute(route, callback) {
			// [1] create a route regexp
			var routeRegExp = _routeToRegExp(route);

			this.mainSwtch.when(routeRegExp, callback);
		},

		/**
		 * Defines a new swtch.
		 *
		 * @param  {[type]} routes [description]
		 * @return {[type]}        [description]
		 */
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

