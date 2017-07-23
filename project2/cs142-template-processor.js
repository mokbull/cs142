var Cs142TemplateProcessor = function (template) {
	this.template = template;
	this.keys = {};
	this.keysarr = [];
	var i, propStart;
	for (i = 0; i < template.length; i++) {

		if ((template[i] == '}') && (template[i+1] == '}')) {
			tracking = false;
			this.keys[template.substring(propStart, i)] = [propStart - 3, i + 2]
			this.keysarr[this.keysarr.length] = template.substring(propStart, i);
			i = i+2;

		}

		if ((template[i] == '{') && (template[i+1] == '{')) {
			tracking = true;
			i = i+2;
			propStart = i;
		}

	}
}

Cs142TemplateProcessor.prototype.fillIn = function(dict) {
	var i;
	for (i = this.keysarr.length - 1; i >= 0; i--) {
		var key = this.keysarr[i];
		var temp = this.template;
		var arr = this.keys[key];
		var ln = temp.length;
		if (dict[key] != undefined) {
			temp = temp.substring(0, arr[0] + 1) + dict[key] + temp.substring(arr[1], ln);
		} else {
			temp = temp.substring(0, arr[0] + 1) + temp.substring(arr[1], ln);
		}
		this.template = temp;
	}

	return this.template;

	/*var diff = 0;
	for (var key in dict)  {	
		console.log(this.keys[key]);
		console.log(this.template);	
		var temp = this.template;
		if (this.keys[key] != undefined) {
			//console.log(key);
			//console.log(this.keys.key);
			var arr = this.keys[key];
			var ln = temp.length;
			temp = temp.substring(0, arr[0] + 1) + dict[key] + temp.substring(arr[1], ln);
			
		} 
		this.template = temp;
	}

	return this.template;*/
}