// Creating map object
var myMap = L.map("map", {
    center: [40.7, -35.95],
    zoom: 2.5
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 20,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  
  // Grab the data with d3
  d3.csv("data/heatmap.csv").then(function(data) {
  
    var markers = L.markerClusterGroup();

    for (var i = 0; i < data.length; i++) {
  
      var location = data[i];
  
      if (location) {
  
        markers.addLayer(L.marker([data[i].latitude, data[i].longitude])
               .bindPopup("<br> Date: " + data[i].date + "<br> Number Ppl Fully Vaxxed: " + data[i].cumulative_persons_fully_vaccinated));
      }
  
    }
  
    myMap.addLayer(markers);
  
  });
  