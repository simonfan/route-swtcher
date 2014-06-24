require.config({
	urlArgs: 'bust=0.6616475761402398',
	baseUrl: '/src',
	paths: {
		requirejs: '../bower_components/requirejs/require',
		text: '../bower_components/requirejs-text/text',
		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',
		'route-swtcher': 'index',
		backbone: '../bower_components/backbone/backbone',
		jquery: '../bower_components/jquery/dist/jquery',
		lodash: '../bower_components/lodash/dist/lodash.compat',
		'lowercase-backbone': '../bower_components/lowercase-backbone/built/lowercase-backbone',
		'requirejs-text': '../bower_components/requirejs-text/text',
		qunit: '../bower_components/qunit/qunit/qunit',
		underscore: '../bower_components/underscore/underscore',
		swtch: '../bower_components/swtch/built/swtch',
		subject: '../bower_components/subject/built/subject'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		}
	}
});
