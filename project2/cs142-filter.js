Array.prototype.cs142filter = function(clientData, isOK) {
	var new_arr = [];
	var i;
	for (i = 0; i < this.length; i++) {
		if (isOK(clientData, this[i])) {
			new_arr[new_arr.length] = this[i];
		}
	}
	return new_arr;
}