/* global L */

var map1 = L.map('map1').setView([40.704066343242495,-73.97859628894267], 10);

// Add base layer
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  maxZoom: 18,
  minZoom: 9
}).addTo(map1);

var myStyle = {
  color: 'green',
  weight: 0.5,
  opacity: 0.9
};

var markerOptions = {
    radius: 6,
    fillColor: 'teal',
    color: 'yellow',
    weight: 2,
    opacity: 0.6,
    fillOpacity: 0.6
};

fetch('https://data.cityofnewyork.us/resource/y6ja-fw4f.geojson?$limit=14000&$offset=0')
  .then(function (response) {
    // Read data as JSON
    return response.json();
  })
  .then(function (data) {
    // Create the Leaflet layer for the data 
    var parkData = L.geoJson(data, myStyle);
  
    // Add popups to the layer
    parkData.bindPopup(function (layer) {
      // This function is called whenever a feature on the layer is clicked
      
      // Uncomment this to see all properties on the clicked feature:
      console.log(layer.feature.properties);
      return layer.feature.properties['park_name'];
    });
  
    // Add data to the map
    parkData.addTo(map1);
  
    // Move the map view so that the complaintData is visible
    map1.fitBounds(parkData.getBounds());
  });

/*fetch('https://data.cityofnewyork.us/resource/y6ja-fw4f.geojson?$limit=6990&$offset=10')
  .then(function (response) {
    // Read data as JSON
    return response.json();
  })
  .then(function (data) {
    // Create the Leaflet layer for the data 
    var parkData1 = L.geoJson(data, {color: 'green'});
  
    // Add popups to the layer
    parkData1.bindPopup(function (layer) {
      // This function is called whenever a feature on the layer is clicked
      
      // Uncomment this to see all properties on the clicked feature:
      console.log(layer.feature.properties);
      return layer.feature.properties['park_name'];
    });
  
    // Add data to the map
    parkData1.addTo(map1);
  
    // Move the map view so that the complaintData is visible
    map1.fitBounds(parkData1.getBounds());
  });


fetch('https://data.cityofnewyork.us/resource/y6ja-fw4f.geojson?$limit=7000&$offset=7000')
  .then(function (response) {
    // Read data as JSON
    return response.json();
  })
  .then(function (data) {
    // Create the Leaflet layer for the data 
    var parkData2 = L.geoJson(data, {color: 'green'});
  
    // Add popups to the layer
    parkData2.bindPopup(function (layer) {
      // This function is called whenever a feature on the layer is clicked
      
      // Uncomment this to see all properties on the clicked feature:
      console.log(layer.feature.properties);
      return layer.feature.properties['park_name'];
    });
  
    // Add data to the map
    parkData2.addTo(map1);
  
    // Move the map view so that the complaintData is visible
    map1.fitBounds(parkData2.getBounds());
  });
*/
// Fetch Community Garden Locations
fetch('https://data.cityofnewyork.us/resource/yes4-7zbb.json')
  .then(function (response) {
    // Read data as JSON
    return response.json();
  })
  .then(function (data) {
    // The following method for converting JSON to geoJSON adapted from StackExchange thread:
    // https://gis.stackexchange.com/questions/195422/create-map-using-leaflet-and-json

    var jsonFeatures = [];
    
    data.forEach(function (point){
      var lat = point.latitude;
      var lon = point.longitude;
      
      // Filter-out bad data from NYC Open Data SODA
      // Community Gardens are only mapped if Latitude and Longitude are provided from SODA
        // no additional geolocation is done (eg. by address)
      if (lat!==undefined) {
        if (lon!==undefined) {
          var feature = {type: 'Feature',
            properties: point,
            geometry: {
              type: 'Point',
              coordinates: [lon,lat]
            }
          };
          jsonFeatures.push(feature);
        };
      };
    });
  
    var geoJson = { type: 'FeatureCollection', features: jsonFeatures };
  
    // Create the Leaflet layer for the data 
    var comGarden = L.geoJson(geoJson, {
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, markerOptions);
      }
    });
  
    // Add popups to the layer
    comGarden.bindPopup(function (layer) {
      // This function is called whenever a feature on the layer is clicked
      
      // Uncomment this to see all properties on the clicked feature:
      console.log(layer.feature.properties);
      return layer.feature.properties['garden_name'];
    });
  
    // Add data to the map
    comGarden.addTo(map1);
  
    // Move the map view so that the complaintData is visible
    // map1.fitBounds(comGarden.getBounds());
  });


// https://a.tile.openstreetmap.org/{z}/{x}/{y}.png

// https://data.cityofnewyork.us/resource/y6ja-fw4f.json

//40.704066343242495
//-73.97859628894267

//[40.666577,-73.987427]