class NavbarHelper {
	// https://stackoverflow.com/questions/14756420/emulate-click-on-leaflet-map-item
	static selectionDidChange() {
		var selectedPlace = $("#selectPlace").val();
		
		if (selectedPlace != "-1") {
			var leafletID = globalFeatureIDTracker[selectedPlace]["leaflet_id"];
			var capturedGeoJSONObject = globalFeatureIDTracker[selectedPlace]["captured_geojson_object"];
			var layer = capturedGeoJSONObject.getLayer(leafletID);
			//fire event 'click' on target layer 
			layer.fireEvent('click');

			$("#selectPlace").val(-1);
			$("#selectPlace").trigger('change');

		}
	}

	static changeMapTiles(selectedMap) {
		// remove old
		$("#togglefor_" + globalCurrentTilesSelection).removeClass("active");
		globalCurrentTiles.removeFrom(globalMapObject);

		// set new
		globalCurrentTilesSelection = selectedMap;
		globalCurrentTiles = MapTileHelper.tileLayers[selectedMap];

		// implement new
		$("#togglefor_" + selectedMap).addClass("active");
		globalCurrentTiles.addTo(globalMapObject);

		// dark mode
		if (selectedMap == "CartoDB_DarkMatter") {
			setNavbarDarkMode(true);
		} else {
			setNavbarDarkMode(false);
		}
	}

	/**
	 * Sets dark mode (for the navigation bar only!) 😎
	 * 
	 * @param {boolean} isDarkMode `true` for dark mode, `false` for light mode
	 */
	static setNavbarDarkMode(isDarkMode) {
		if (isDarkMode) {
			$("#mynavbar").removeClass("navbar-light");
			$("#mynavbar").removeClass("bg-light");
			$("#mynavbar").addClass("navbar-dark");
			$("#mynavbar").addClass("bg-dark");
		} else {
			$("#mynavbar").removeClass("navbar-dark");
			$("#mynavbar").removeClass("bg-dark");
			$("#mynavbar").addClass("navbar-light");
			$("#mynavbar").addClass("bg-light");
		}
	}
}