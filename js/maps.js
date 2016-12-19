// foursquare API parser
function getPlaces(map, latlong) {
  console.log("called");
  var lat = latlong.lat;
  var lng = latlong.lng;
  
  // ajax call
  var url = "https://api.foursquare.com/v2/venues/search?";
  url += "client_id=5AK2P0VFZXAADKGJX222X1SVYYYWVBXKUM2MNT23KK3PYZEP";
  url += "&client_secret=IBFMZBBYID2RTLY1TVQMCYOSQP1SDOID5PJRNGRYLVF2TMCP";
  url += "&v=20130815&";
  url += "ll=" + lat;
  url += "," + lng;
  url += "&query=cafe";
  
  $.getJSON(url, function(data) {
      var places = data.response.venues;
      var items = [];
      var i, len, item;
    
      for(i=0, len=places.length; i < len; i++) {
        item = {
          "id": i,
          "name": places[i].name,
          "address": places[i].location.address,
          "pos": {
            "lat": places[i].location.lat,
            "lng": places[i].location.lng          
          }
        };
        
        items.push(item);
      }
    
      // update places variable
      localStorage.setItem("places", JSON.stringify(items));
      init();
    
      drawMarkers(map, items);
    })
    .error(function() {
      alert("Foursquare Data couldn't be loaded!");
    });
}

// Google Map Markers
function drawMarkers(map, positions) {
  var i, len, marker, contentString;
  markers = [];  
  var infowindow = new google.maps.InfoWindow({
    content: ''
  });
  
  for (i=0, len=positions.length; i<len; i++) {
    contentString = "<h5>" + positions[i].name + "</h5>";
    contentString += "<p>" + positions[i].address + "</p>";   
    
    marker = new google.maps.Marker({
      position: positions[i].pos,
      map: map,
      title: positions[i].name
    });
    
    bindInfoWindow(marker, map, infowindow, contentString);
    
    markers.push(marker);
    m = markers;
  }  
}

// Info Window Binder
function bindInfoWindow(marker, map, infowindow, description) {
    marker.addListener('click', function() {
        infowindow.setContent(description);
        infowindow.open(map, this);      
      
        // Make the marker bounce
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ marker.setAnimation(null); }, 3000);
    });
}

// Diable all markers
function disableAllMarkers(markers, map) {
  var i, len;
  
  for (i=0, len=markers.length; i < len; i++) {
    m[i].setMap(null);
  }
}

// Enable all markers
function enableAllMarkers(markers, map) {
  var i, len;
  
  for (i=0, len=markers.length; i < len; i++) {
    m[i].setMap(map);
  }
}

// Enable marker
function enableMarker(marker, map, id) {
  //console.log(id);
  m[id].setMap(map);
}