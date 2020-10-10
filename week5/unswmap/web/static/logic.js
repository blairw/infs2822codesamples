// keep track of Leaflet map for use between functions
var globalMapObject;

// keep track of which map tiles have been selected
var globalCurrentTilesSelection;
var globalCurrentTiles;

// keep track of items added
var globalFeatureIDTracker = {};

// list of items to add
var itemsToAdd = [
	"buildings/quad.json"
	, "buildings/scientia-lawn.json"
];

function bodyDidLoad() {
	ShowtimeHelper.setDarkModeAccordingToBrowser();
	ShowtimeHelper.initialiseSelect2();
	
	
	// OK - Ready to Initialise the map! :)

	globalMapObject = L.map('mapid').setView([-33.918, 151.23], 17);
	globalCurrentTiles.addTo(globalMapObject);

	itemsToAdd.forEach(function(item) {
		$.get(item, function(incomingGeoJSON) {
			MapHelper.processAddedUNSWFeature(incomingGeoJSON);
		});
	});


	// Example: lines

	var tripStyle = {
		"color": "red"
		, "weight": 3
		, "opacity": 0.5
		, "dashArray": "5"
	};

	$.get("buildings/example-journey.json", function(incomingGeoJSON) {
		MapHelper.processAddedUNSWFeature(incomingGeoJSON, tripStyle);
	});


	// Example: marker

	L.marker([-33.91940969012724, 151.22611999511716]).addTo(globalMapObject)
		.bindPopup('I parked here').openPopup();

	// Done!
}