var pkWeAreUpTo = 1;
var listItems = [
	
];

function userDidClickCreate() {
	var userEnteredText = captureUserData();
	var newItemDictionary = {
		"id": pkWeAreUpTo
		, "name": userEnteredText
	};
	listItems.push(newItemDictionary);
	pkWeAreUpTo++;
	redrawTable(newItemDictionary);
}

function captureUserData() {
	var input_newEntry = document.getElementById("input_newEntry");
	var userEnteredText = input_newEntry.value;
	// console.log("userEnteredText = " + userEnteredText);

	return userEnteredText;
}

function redrawTable(newItemDictionary) {
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
	// go to listItems and delete the row
	// IMPLEMENT LATER

	// go to DOM and delete the row
	document.getElementById("rowForItem_" + rowToDelete).innerHTML = "";
}