var pkWeAreUpTo = 1;
var listItems = [
	
];

function bodyDidLoad() {
	const inputElement = document.getElementById("fileUploader");
	inputElement.addEventListener("change", handleFiles, false);
	function handleFiles() {
		file0 =  this.files[0];
		var myFileReader = new FileReader();
		myFileReader.onload = function(fileLoadedEvent){
			var textFromFileLoaded = fileLoadedEvent.target.result;
			fileDidFinishGettingRead(textFromFileLoaded);
		};
		myFileReader.readAsText(file0);
	}
}

function fileDidFinishGettingRead(textFromFileLoaded) {
	console.log(textFromFileLoaded);
	myNewList = JSON.parse(textFromFileLoaded);
	redrawTableFromList(myNewList);
}

function redrawTableFromList(myNewList) {
	$("tbodyForTasks").html("");
	myNewList.forEach(element => addItemToTable(element));
}

function userDidClickCreate() {
	var userEnteredText = captureUserData();
	var newItemDictionary = {
		"id": pkWeAreUpTo
		, "name": userEnteredText
		, "demoNesting": [
			{"a": "A", "b": "B"}
			, {"a": "A", "b": "B"}
			, {"a": "A", "b": "B"}
		]
	};
	listItems.push(newItemDictionary);
	pkWeAreUpTo++;
	addItemToTable(newItemDictionary);
}

function captureUserData() {
	// var input_newEntry = document.getElementById("input_newEntry");
	var input_newEntry = $("#input_newEntry").val();

	var userEnteredText = input_newEntry;
	// console.log("userEnteredText = " + userEnteredText);

	return userEnteredText;
}

function addItemToTable(newItemDictionary) {
	var tbodyForTasks = document.getElementById("tbodyForTasks");
	var myActions = "<a onclick='deleteItem(" + newItemDictionary["id"] + ")' href='#'>Delete This One</a>";

	var preparedRowHTML = "<tr id='rowForItem_" + newItemDictionary["id"] + "'>";
	preparedRowHTML += "<td class='subtleText'>" + newItemDictionary["id"] + "</td>";
	preparedRowHTML += "<td><em>" + newItemDictionary["name"] + "</em></td>";
	preparedRowHTML += "<td>" + myActions + "</td>";
	preparedRowHTML+= "</tr>";

	tbodyForTasks.innerHTML += preparedRowHTML;
}

function deleteItem(rowToDelete) {
	console.log("deleteItem triggered for row = " + rowToDelete);
	var itemToRemove = _.findWhere(listItems, {"id": rowToDelete});
	listItems = _.without(listItems, itemToRemove);
	// IMPLEMENT LATER

	// go to DOM and delete the row
	document.getElementById("rowForItem_" + rowToDelete).innerHTML = "";
}

function downloadJSON() {
	download("data.json", JSON.stringify(listItems, null, '\t'));
}

// Adapted from:
// https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
  
	element.style.display = 'none';
	document.body.appendChild(element);
  
	element.click();
  
	document.body.removeChild(element);
}

function userDidClickRobertButton() {
	console.log("Hello world and hi Robert");
}