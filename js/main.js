function loadTableHeader(table) {
	var row = table.insertRow(0);
	row.insertCell(0);
	for (var i = 0; i < window.examData.columns.length; i++) {
		row.innerHTML += "<th>" + window.examData.columns[i].title + "</th>";
	}
}

function loadRows(table) {
	for (var i = 0; i < window.examData.rows.length; i++) {
		var row = table.insertRow(i + 1);
		row.innerHTML = "<th>" + window.examData.rows[i].title + "</th>";
		for (var j = 0; j < window.examData.columns.length; j++) {
			row.innerHTML += "<td><ol class='dragList'/></td>";
		}
	}
}

function loadItems() {
	var ul = document.getElementById("itemList");
	for (var i = 0; i < window.examData.items.length; i++) {
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(window.examData.items[i].title));
		li.setAttribute("draggable", "true");
		ul.appendChild(li);
	}
}

function loadData() {
	var table = document.getElementById("mainTable");
	loadTableHeader(table);
	loadRows(table);
	loadItems();
}

loadData();
