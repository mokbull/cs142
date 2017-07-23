function TableTemplate() {

}

TableTemplate.fillIn = function (table_id, dict) {
	var table = document.getElementById(table_id);
	console.log(table.innerHTML);
	var processor = new Cs142TemplateProcessor(table.innerHTML);
	table.innerHTML = processor.fillIn(dict);
	if (table.style.visibility === "hidden") {
		table.style.visibility = "visible";
	}
};