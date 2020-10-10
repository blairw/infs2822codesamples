// keep track of Leaflet map for use between functions
var globalMapObject;
var globalTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});

function bodyDidLoad() {
	// OK - Ready to Initialise the map! :)

	globalMapObject = L.map('mapid').setView([-33.918, 151.23], 17);
	globalTiles.addTo(globalMapObject);
	
	$.get("postcodes-geojson/au-postcodes-Visvalingam-0.1.geojson", function(incomingGeoJSON) {
	// $.get("postcodes-geojson/au-postcodes.geojson", function(incomingGeoJSON) {
		var mysubset = {
			"type": "FeatureCollection",
    		"features": []
		}
		var postcodeBoundaries = JSON.parse(incomingGeoJSON);

		postcodeBoundaries["features"].forEach(function(item, index) {
			if (
				parseInt(item["properties"]["POA_CODE16"]) >= "2000"
				&& parseInt(item["properties"]["POA_CODE16"]) < "2200"
			) {
				mysubset.features.push(item);
			}
		});
		
		L.geoJSON(mysubset, {
			onEachFeature: function(feature, layer) {
				// https://leafletjs.com/examples/geojson/
				if (feature.properties && feature.properties["POA_CODE16"]) {
                    var preparedString = "<strong>" + feature.properties["POA_CODE16"] + "</strong>";
					layer.bindPopup(preparedString);
				}
			}
		}).addTo(globalMapObject);
	});
}