define(['libs/backbone', 'components/AvailableCar'], function(Backbone, AvailableCar){

	var AvailableCars = Backbone.Collection.extend({
		model: AvailableCar,
		byId: function(id) {
			for(var i = 0; i < this.models.length; i++) {
				if(this.models[i].attributes.id === id) {
					return this.models[i];
				}
			}
		},
		search: function(attribute, value) {
			return this.some(function(x){
				return x.get(attribute) === value;
			});
		},
		// for testing only
		incrementCoords: function(model) {
			var newLat = model.attributes.latitude += 0.00008,
				newLng = model.attributes.longitude += 0.0005,
				models = ['yaris', 'auris', 'prius'];
				i = Math.floor((Math.random()*2));
				newModel = models[i];
			model.set({latitude: newLat});
			model.set({longitude: newLng});
			//model.set({model: newModel});
			//console.log(model);
			model.trigger('change', model);
		}
	});

	var availableCars = new AvailableCars();

	availableCars.add([
		new AvailableCar({registration:'gy08vpy', latitude: 51.516225, longitude: -0.130857, model: 'auris'}),
		new AvailableCar({registration:'hg12bpm', latitude: 51.52288, longitude: -0.15711, model: 'prius'})
	]);

	return availableCars;
});