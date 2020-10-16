class NavbarHelper {
	
	/**
	 * Handle user selection of place to simulate mouse click on.
	 */
	static selectionDidChange() {
		var selectedPlace = $("#selectPlace").val();
		
		if (selectedPlace != "-1") {
			MapHelper.simulateMouseClick(selectedPlace);

			$("#selectPlace").val(-1);
			$("#selectPlace").trigger('change');
		}
	}

	/**
	 * Handles user selection of the theme (map tiles being used 🗺), also potentially navbar dark mode.
	 * 
	 * @param {Object} selectedMap The Leaflet `L.tileLayer` objects, as made available through `MapTileHelper`.
	 */
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
			NavbarHelper.setNavbarDarkMode(true);
		} else {
			NavbarHelper.setNavbarDarkMode(false);
		}
	}

	/**
	 * Sets navbar dark mode (for the navigation bar only!) 😎
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