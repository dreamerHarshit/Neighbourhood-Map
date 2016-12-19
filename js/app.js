function init() {
  var placesData = JSON.parse(localStorage.getItem("places"));
  
  var PlacesView = function(data) {
    this.name = ko.observable(data.name);
    this.id = ko.observable(data.id);
  };
  
  var ViewModel = function() {
    var self = this;
    
    // searchbox data
    this.filter = ko.observable();
    
    this.places = ko.observableArray([]);
    placesData.forEach(function(place) {
      self.places().push(new PlacesView(place));
    });    
    
    // generate list of places based on the filter
    this.placesList = ko.computed(function() {
      if (!self.filter()) {
        try {
          // draw all markers
          enableAllMarkers(m, map);
        } catch(err) {
          
        }
        return self.places();
      } else {
        // clean map of all markers
        disableAllMarkers(m, map);
        return ko.utils.arrayFilter(self.places(), function(place) {
          var condition = place.name().toLowerCase().indexOf(self.filter().toLowerCase()) > -1;
          
          if (condition) {  
            // draw the required markers
            enableMarker(m, map, place.id());
          }
          
          return condition;
        });
      }   
    });  
    
    // trigger marker click
    this.triggerMarker = function(obj, event) {
      var marker = m[obj.id()];
      
      google.maps.event.trigger(marker, 'click');
    };    
  };
  
  ko.applyBindings(new ViewModel());
}