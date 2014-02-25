define(['libs/backbone'], function(Backbone){

	var Markers = Backbone.Collection.extend({
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
		}
	});

	var markers = new Markers();

	return markers;
});