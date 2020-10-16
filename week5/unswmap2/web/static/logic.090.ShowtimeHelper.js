class ShowtimeHelper {
	static setDarkModeAccordingToBrowser() {
		// https://stackoverflow.com/questions/50840168/how-to-detect-if-the-os-is-in-dark-mode-in-browsers
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			NavbarHelper.setNavbarDarkMode(true);
			$("#togglefor_CartoDB_DarkMatter").addClass("active");
			globalCurrentTilesSelection = "CartoDB_DarkMatter";
		} else {
			NavbarHelper.setNavbarDarkMode(false);
			$("#togglefor_CartoDB_Positron").addClass("active");
			globalCurrentTilesSelection = "CartoDB_Positron";
		}
		globalCurrentTiles = MapTileHelper.tileLayers[globalCurrentTilesSelection];
	}
		
	static initialiseSelect2() {
		$('#selectPlace').select2({
			theme: 'bootstrap4',
			width: '15rem'
		});
	}
}