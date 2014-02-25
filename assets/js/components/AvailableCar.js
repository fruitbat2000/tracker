define(['libs/backbone'],function(Backbone){
	var AvailableCar = Backbone.Model.extend({
		defaults: {
			registration: '',
			latitude: '',
			longitude: '',
			model: ''
		}
	});

	return AvailableCar;
});