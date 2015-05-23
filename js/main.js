function loadTableHeader(table) {
	var row = table.insertRow(0);
	row.insertCell(0);
	for (var i = 0; i < window.examData.columns.length; i++) {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(window.examData.columns[i].title));
        row.appendChild(th);
	}
}

function loadRows(table) {
	for (var i = 0; i < window.examData.rows.length; i++) {
		var row = table.insertRow(i + 1);
		row.innerHTML = "<th>" + window.examData.rows[i].title + "</th>";
		for (var j = 0; j < window.examData.columns.length; j++) {
            var ol = document.createElement("ol");
            ol.setAttribute("id", getOlId(j, i));
            ol.classList.add("dragList");
            ol.setAttribute("ondragover", "allowDrop(event)");
            ol.setAttribute("ondrop", "drop(event)");
            var td = row.insertCell(j + 1);
            td.appendChild(ol);
		}
	}
}

function getOlId(col, row) {
    return "ol" + col + "_" + row;
}

function loadItems() {
	var ul = document.getElementById("itemList");
	for (var i = 0; i < window.examData.items.length; i++) {
        var item = window.examData.items[i];
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(item.title));
		li.setAttribute("draggable", "true");
        li.setAttribute("ondragstart", "drag(event)");
        li.setAttribute("id", "item" + i);
        li.setAttribute("data-col", item.col);
        li.setAttribute("data-row", item.row);
        li.setAttribute("data-order", item.order); 
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

