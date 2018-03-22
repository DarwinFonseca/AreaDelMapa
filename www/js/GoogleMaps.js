
      // In the following example, markers appear when the user clicks on the map.
      // The markers are stored in an array.
      // The user can then click an option to hide, show or delete the markers.
      var map;
      var markers = [];

      function initMap() {

        var Uniminuto = {lat: 4.698162162531329, lng: -74.08907175064087};

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: Uniminuto,
          //mapTypeId: 'terrain'
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        });

        // This event listener will call addMarker() when the map is clicked.
        map.addListener('click', function(event) {
          addMarker(event.latLng);
		});

		google.maps.event.addListener(marker, "dragend", function() {
          getCoords(marker);
        });
        // Adds a marker at the center of the map.
        //addMarker(haightAshbury);
      }

      // Adds a marker to the map and push to the array.
      function addMarker(location) {
        var marker = new google.maps.Marker({
          position: location,
          draggable: true,
          animation: google.maps.Animation.DROP,
          //label: labels[labelIndex++ % labels.length],
          map: map
        });
        markers.push(marker);
        misMarcadores.push(location);
        getCoords(marker);

		

        google.maps.event.addListener(marker, "dragend", function() {
          getCoords(marker);
        });
      }

      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }

      // Shows any markers currently in the array.
      function showMarkers() {
        setMapOnAll(map);
      }

      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
      }
 
		function getCoords(marker){
			  //document.getElementById("VerDatos").innerHTML="Latitud: " + marker.getPosition().lat() + " Longitud:  " + marker.getPosition().lng() + "<br>";
		}

		function AsignarCoordenadas(marker) {
		  VerDatos = document.getElementById("VerDatos");
          VerDatos.innerHTML=VerDatos.innerHTML+"Lat: " + marker.getPosition().lat()+ " Long: " + marker.getPosition().lng() + "<br>";
			//Envío el valor numérico en a los arreglos correspondientes.
			Latitudes.push(Number(marker.getPosition().lat()));
			Longitudes.push(Number(marker.getPosition().lng()));
		}

		function haversine(marker){
		
			var toRad=Math.PI/180;
			var latGW = -0.001389; 
			var lonGW = 51.477778; 
			var lat1 = marker.getPosition().lat(); 
			var lon1 = marker.getPosition().lng(); 

			var R = 6371; 
			var x1 = lat2-lat1;
			var dLat = x1*toRad;  
			var x2 = lon2-lon1;
			var dLon = x2*toRad;  
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
							Math.cos(lat1*toRad) * Math.cos(lat2*toRad) * 
							Math.sin(dLon/2) * Math.sin(dLon/2);  
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var d = R * c;
			 
		} 		
		
		function calcularArea(){
		
		document.getElementById("VerDatos").innerHTML="<hr>";
		markers.forEach(AsignarCoordenadas);
		
		var toRad=Math.PI/180;
		var km=1000000;
			for(var i=0;i<Latitudes.length; i++){
			if(i==0){
			var a=0;
			var b=0;
			var x=0;
			}
				  if(i!=(Latitudes.length-1)){
		  			  a=a+( (Math.abs(Latitudes[i])*toRad) * (Math.abs(Longitudes[(i+1)])*toRad) );
		  			  b=b+( (Math.abs(Latitudes[(i+1)])*toRad) * (Math.abs(Longitudes[i])*toRad) );
					}else{
		  			 a=a+( (Math.abs(Latitudes[i])*toRad) * (Math.abs(Longitudes[0])*toRad) );
		  			 b=b+( (Math.abs(Latitudes[0])*toRad) * (Math.abs(Longitudes[i])*toRad) );
					}
			  }
			x=((a-b)/2) * km;
			i=0
			if(x<0){
				x=Math.abs(x);
			}
            document.getElementById("Respuesta").innerHTML = "El area es: "+ x +" Km<sup>2</sup>.";
			// <br>A es: "+a+"<br>B es: "+b
			//+ "<br>El tamaño del Array: "+Latitudes.length+ "<br>Posicion de i: "+i;
			
		}