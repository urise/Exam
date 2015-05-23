function loadTableHeader(table) {
	var row = table.insertRow(0);
	row.insertCell(0);
	for (var i = 0; i < window.examData.columns.length; i++) {
        row.appendChild(getTh(window.examData.columns[i].title));
	}
}

function loadRows(table) {
	for (var i = 0; i < window.examData.rows.length; i++) {
		var row = table.insertRow(i + 1);
        row.appendChild(getTh(window.examData.rows[i].title));

		for (var j = 0; j < window.examData.columns.length; j++) {
            var ol = document.createElement("ol");
            ol.setAttribute("id", getOlId(j, i));
            ol.classList.add("puzzleOl");
            ol.setAttribute("ondragover", "allowDrop(event)");
            ol.setAttribute("ondrop", "drop(event)");
            var td = row.insertCell(j + 1);
            td.appendChild(ol);
		}
	}
}

function getTh(text) {
    var th = document.createElement("th");
    th.appendChild(document.createTextNode(text));
    return th;
}

function getOlId(col, row) {
    return "ol" + col + "_" + row;
}

function loadItems() {
	var ul = document.getElementById("itemList");
	for (var i = 0; i < window.examData.items.length; i++) {
        var li = getLiByItem(window.examData.items[i], i);
		ul.appendChild(li);
	}
}

function getLiByItem(item, index) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(item.title));
    li.setAttribute("draggable", "true");
    li.setAttribute("ondragstart", "drag(event)");
    li.setAttribute("id", "item" + index);
    li.setAttribute("data-col", item.col);
    li.setAttribute("data-row", item.row);
    li.setAttribute("data-order", item.order); 
    return li;
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
    var expectedOlId = getOlId(li.getAttribute("data-col"), li.getAttribute("data-row"));
    list.appendChild(li);

    if (expectedOlId === list.id) {
        li.classList.remove("wrongPosition");
        li.classList.add("rightPosition");
    } else {
        li.classList.remove("rightPosition");
        li.classList.add("wrongPosition"); 
    }
}

function clearPuzzle() {
    var ols = document.getElementsByClassName("puzzleOl");
    for (var i = 0; i < ols.length; i++) {
        var ol = ols[i];
        ol.innerHTML = "";
    }
}

function clearLowerList() {
    var ul = document.getElementById("itemList");
    ul.innerHTML = "";
}

function reset() {
    clearPuzzle();
    clearLowerList();
    loadItems();
}
