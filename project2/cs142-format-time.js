
function convertDate(dateIn) {
	var hr = dateIn.getHours();
	var min = dateIn.getMinutes();
	var format = 'AM';

	if (hr > 12) {
		hr -= 12;
		format = 'PM';
	}

	if (hr == 0) {
		hr = 12;
	}

	if (hr < 10) {
		hr = '0' + hr;
	}

	if (min < 10) {
		min = '0' + min;
	} 


	return hr + ':' + min + ' ' + format;
}

function cs142FormatTime (dateIn) {
	var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	var dateTime = convertDate(dateIn);
	var dateString = daysOfWeek[dateIn.getDay()] + ', ' + monthsOfTheYear[dateIn.getMonth()] + ' ' + dateIn.getDate() + ', ' + dateIn.getFullYear() + ' ' + dateTime;
	return dateString;
}
