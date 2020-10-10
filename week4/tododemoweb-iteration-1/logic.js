function userDidClickCreate() {
	var input_newEntry = document.getElementById("input_newEntry");
	var userEnteredText = input_newEntry.value;
	// console.log("userEnteredText = " + userEnteredText);

	var ol_todoList = document.getElementById("ol_todoList");
	ol_todoList.innerHTML += "<li>" + userEnteredText + "</li>";
}