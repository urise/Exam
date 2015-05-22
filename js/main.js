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
            var ol = document.createElement("ol");
            ol.classList.add("dragList");
            ol.setAttribute("ondragover", "allowDrop(event)");
            ol.setAttribute("ondrop", "drop(event)");
            var td = row.insertCell(j + 1);
            td.appendChild(ol);
		}
	}
}

function loadItems() {
	var ul = document.getElementById("itemList");
	for (var i = 0; i < window.examData.items.length; i++) {
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(window.examData.items[i].title));
		li.setAttribute("draggable", "true");
        li.setAttribute("ondragstart", "drag(event)");
        li.setAttribute("id", "item" + i);
		ul.appendChild(li);
	}
}

function loadData() {
	var table = document.getElementById("mainTable");
	loadTableHeader(table);
	loadRows(table);
	loadItems();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var id = ev.dataTransfer.getData("id");
    var li = document.getElementById(id);
    var list = ev.target.nodeName === "LI" ? ev.target.parentNode : ev.target;
    list.appendChild(li);
    li.classList.add("rightPosition");
}

loadData();
