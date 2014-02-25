requirejs.config({
    shim: {
    	"libs/jquery": {
    		exports: 'jquery'
    	},
		"libs/handlebars": {
			exports: 'Handlebars'
		},
		"libs/underscore": {
			exports: '_'
		},
		"libs/backbone": {
			deps: ['libs/underscore', 'libs/jquery'],
			exports: 'Backbone'
		}
	}
});
require(['components/sockets', 'components/map-view']);