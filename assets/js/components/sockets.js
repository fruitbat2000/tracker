define([
	'components/availableCars',
	'components/AvailableCar'
],

function(availableCars, AvailableCar){

	// vars
	var latitude,
		longitude;

	// grab latitude and longitude from geolocation
	function currentPosition(position) {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
	}

	// connect socket and flag that it connected successfully
	var socket = io.connect();
	var socketConnected = false;
	socket.on('connected', function(data){
		if(data.connected) {
			socketConnected = true;
			console.log('socket connected');
		} else {
			console.log('something went wrong');
		}
	});

	// send the user's data when they submit it and set up an interval to poll the car's position
	// this function would live within the driver's app
	$('#car-details').on('submit', function(e){
		e.preventDefault();
		if(socketConnected) {
			var model = $('#model').val(),
				registration = $('#registration').val();
			setInterval(function(){
				navigator.geolocation.getCurrentPosition(currentPosition);
				socket.emit('send', {'model': model, 'registration': registration, 'latitude': latitude, 'longitude': longitude});
			}, 3000);
		} else {
			console.log('we cannot submit your data at the moment');
		}		
	});

	// when we receive car data, search the availableCars collection and either add a new AvailableCar or update the info on an existing AvailableCar
	socket.on('carData', function(data){

		if(data.latitude) {
			if(availableCars.search('registration', data.registration)) {
				// grab the correct car and update its data
				var car = availableCars.where({registration: data.registration})[0];
				car.set({model: data.model, latitude: data.latitude, longitude: data.longitude});
			} else {
				// add the new car to the collection
				availableCars.add(
					new AvailableCar({registration: data.registration, model: data.model, latitude: data.latitude, longitude: data.longitude})
				)
			}
		}

		//console.log(availableCars);
	});

	// we need to listen for socket disconnect and remove cars from the collection as appropriate
	

	return this;
});

