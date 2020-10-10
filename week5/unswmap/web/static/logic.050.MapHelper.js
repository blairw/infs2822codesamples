class MapHelper {
	/**
	 * 
	 * @param {string} incomingGeoJSON String representation of the geoJSON, with the feature to be added.
	 * @param {Object.<string, string>} style A dictionary with `color`, `opacity`, `weight`, `dashArray`, etc.
	 */
	static processAddedUNSWFeature(incomingGeoJSON, style) {
		var this_id = incomingGeoJSON["features"][0]["properties"]["id"];
		console.log("this_id = " + this_id);

		var settings = {
			onEachFeature: function(feature, layer) {
				// https://leafletjs.com/examples/geojson/
				if (feature.properties && feature.properties.popupContent) {
                    var preparedString = "<strong>" + feature.properties.name + "</strong>";
                    preparedString += "<br />" + feature.properties.popupContent;
					layer.bindPopup(preparedString);
				}
		
				// // https://stackoverflow.com/questions/14756420/emulate-click-on-leaflet-map-item
				if (feature.properties && feature.properties.id) {
					globalFeatureIDTracker[feature.id + ""] = layer._leaflet_id;
				}
			}
		}

		if (style) {
			settings.style = style;
		}

		var addedFeature = L.geoJSON(incomingGeoJSON, settings).addTo(globalMapObject);

		globalFeatureIDTracker[this_id] = {
			"leaflet_id": Object.keys(addedFeature["_layers"])[0],
			"captured_geojson_object": addedFeature
		};
	}
}