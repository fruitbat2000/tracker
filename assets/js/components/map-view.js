define(['libs/backbone', 'components/availableCars', 'components/markers'], function(Backbone, availableCars, markers){

	var MapView = Backbone.View.extend({
		el: '.container',
		collection: availableCars,
		map: '',
		markers: [],
		initialize: function() {
			var self = this;
			_.bindAll(this, 'initPosition', 'defaultMap');
			this.listenTo(this.collection, 'add', this.addMarker);
			this.collection.each(function(model) {
				model.on('change', self.updateMarkers, self);
			});
			/*setInterval(function(){
				self.collection.incrementCoords(self.collection.models[0]);
			}, 3000);*/
			this.render();
		},
		render: function() {
			this.$el.html('<div id="map"></div>');
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(this.initPosition, this.defaultMap);
			} else {
				this.createMap(51.5250929, 0.0293767);
			}
		},
		initPosition: function(position) {
			this.createMap(position.coords.latitude, position.coords.longitude);
		},
		createMap: function(lat, lng) {
			var	mapOptions = {
				center: new google.maps.LatLng(lat, lng),
				zoom: 15
			};
			this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
			this.setupMarkers();
		},
		defaultMap: function() {
			this.createMap(51.5250929, 0.0293767);
		},
		initMarker: function(model) {
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(model.attributes.latitude, model.attributes.longitude),
				title: model.attributes.model,
				map: this.map,
				id: model.attributes.registration
			});
			this.markers.push(marker);
		},
		setupMarkers: function() {
			var self = this;
			if(this.collection.length) {
				this.collection.each(function(model) {
					self.initMarker(model);
				});
			}
		},
		addMarker: function(model) {
			this.initMarker(model);
			model.on('change', this.updateMarkers, this);
		},
		updateMarkers: function(model) {
			var thisMarker;
			for (var i = 0; i < this.markers.length; i++) {
				if(this.markers[i].id === model.attributes.registration) {
					thisMarker = this.markers[i];
				}
			};
			thisMarker.setPosition( new google.maps.LatLng(model.attributes.latitude, model.attributes.longitude));
		}
	});

	var mapView = new MapView();
});