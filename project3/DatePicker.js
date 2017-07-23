"use strict";

function DatePicker (div_id, callback) {
	this.callback = callback;
	this.div = div_id;
	this.element = document.getElementById(div_id);
	this.month = "None";
	this.year = 0;
	this.created_calendars = 0;
}

function get_day (num) {
	var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	return week[num];
}

function get_month (num) {
	var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return month[num];
}

function month_days (month, yr) {
		month += 1;
		return new Date (yr, month, 0).getDate();
}

/*
	This function returns the day on which the 1st of the month of new_date falls so that the calendar can be formatted properly
*/
function first_day (new_date) {
	var day_of_week = new_date.getDay();
	var day_in_month = new_date.getDate();
	if (day_in_month > 1) {
		day_in_month -= 1;
		day_in_month = day_in_month % 7;
		while (day_in_month > 0) {
			if (day_of_week === 0) {
				day_of_week = 6;
			} else {
				day_of_week --;
			}

			day_in_month --;
		}
	} 
	return day_of_week;
}

/*
	The create calendar function creates all of the div elements of the initial html div when render is first called from the html file
*/

DatePicker.prototype.create_calendar = function(calendar) {
	this.created_calendars = 1;
	var cal_table = document.createElement("table");
	var nav_row = document.createElement("tr");
	var that = this;
	calendar.appendChild(cal_table);
	cal_table.appendChild(nav_row);
	nav_row.innerHTML = "<th id=\"" + this.div + "_left_month\"> &lt; </th> <th id=\"" + this.div + "_nav_date\" colspan=\"5\"> </th> <th id=\"" + this.div + "_right_month\"> &gt; </th>";
	for (var i = 0; i < 7; i++) {
		var cal_row = document.createElement("tr");
		cal_table.appendChild(cal_row);
		for (var j = 0; j < 7; j++) {
			if (i === 0) {
				var day = get_day(j).substring(0, 3);
				var day_cell = document.createElement("td");
				var day_text = document.createTextNode(day);
				day_cell.appendChild(day_text);
				cal_row.appendChild(day_cell);
			} else {
				var cell_num = this.div + "_cell_" + ((j+1) + ((i-1)*7));
				var empty_cell = document.createElement("td");
				empty_cell.id = cell_num;
				empty_cell.addEventListener("click", function() {
					var attr = this.getAttribute("title");
					if (attr === "current") {
						var month = this.classList[0];
						var year = parseInt(this.classList[1], 10);
						var new_date = new Date(month + " " + this.textContent + ", " + year);
						that.render(new_date);
					}
				});
				cal_row.appendChild(empty_cell);
			}
		}

	}

	/*
		These are the event listeners for the left and right tab, respectively
	*/
	document.getElementById(this.div + "_left_month").addEventListener("click", function() {
		var month = parseInt(this.classList[0], 10);
		var year = parseInt(this.classList[1], 10);
		if (month === 0) {
			month = 11;
			year --;
		} else {
			month --;
		}
		var new_date = new Date(get_month(month) + " 1, " + year);
		that.render(new_date);
	});

	document.getElementById(this.div + "_right_month").addEventListener("click", function () {
		var month = parseInt(this.classList[0], 10);
		var year = parseInt(this.classList[1], 10);
		if (month === 11) {
			month = 0;
			year++;
		} else {
			month++;
		}
		var new_date = new Date(get_month(month) + " 1, " + year);
		that.render(new_date);
	});
};

DatePicker.prototype.render_calendar = function(new_date, first) {
	/*
		Deletes all the existing text (date numbers) from the old calendar view by removing child node from each cell
	*/
	for (var cellnum = 1; cellnum <= 42; cellnum++ ) {
		var cal_cell = document.getElementById(this.div + "_cell_" + cellnum);
		if (cal_cell.hasChildNodes()) { cal_cell.removeChild(cal_cell.childNodes[0]); }
	}
	var yr = this.year;	
	var month = this.month;
	var num_days_month = month_days(month, yr);
	var prev_month_days = month_days((month === 0 ? 11 : month - 1), yr);
	var next_month_days = month_days((month === 11 ? 0 : month + 1), yr);
	var header_date = document.getElementById(this.div + "_nav_date");
	if (header_date.hasChildNodes()) { header_date.removeChild(header_date.childNodes[0]); }
	var header_text = document.createTextNode(get_month(this.month) + " " + this.year);
	header_date.appendChild(header_text);

	/*
		Updates the inactive cells from the previous month still represented in the calendar 
	*/
	if (first === 1) { first += 7; }
	for (var v = 1; v < first; v++) {
		var shaded_cell_pre = document.getElementById(this.div + "_cell_" + v);
		if (shaded_cell_pre.hasChildNodes()) { shaded_cell_pre.removeChild(shaded_cell_pre.childNodes[0]); }
		var shaded_day = prev_month_days - (first - v) + 1;
		var shaded_text_pre = document.createTextNode(shaded_day);
		
		shaded_cell_pre.appendChild(shaded_text_pre);
		shaded_cell_pre.style.color = "DarkGray";
	}
	var original_first = first;
	var counter2 = 1;

	/*
		Updates the active cells (corresponding to the month in question)
	*/
	while (counter2 <= num_days_month) {
		var day_cell = document.getElementById(this.div + "_cell_" + first);
		var classes = day_cell.classList;
		day_cell.classList.remove(classes[1]);
		day_cell.classList.remove(classes[0]);
		if (day_cell.hasChildNodes()) { day_cell.removeChild(day_cell.childNodes[0]); }
		var day_text = document.createTextNode(counter2);
		day_cell.appendChild(day_text);
		day_cell.setAttribute("title", "current");
		day_cell.classList.add(get_month(month), yr);
		day_cell.style.color = "Black";
		first++;
		counter2++;
	}
	/*
		Updates the inactive cells from the next month still represented in the calendar
	*/
	var counter1 = 1;
	for (var x = (original_first + num_days_month); x <= 42; x++) {
		var shaded_cell_post = document.getElementById(this.div + "_cell_" + x);
		if (shaded_cell_post.hasChildNodes()) { shaded_cell_post.removeChild(shaded_cell_post.childNodes[0]); }
		var shaded_text_post = document.createTextNode(counter1);
		shaded_cell_post.appendChild(shaded_text_post);
		shaded_cell_post.style.color = "DarkGray";
		counter1 ++;
	}

	var left_tab = document.getElementById(this.div + "_left_month");
	var right_tab = document.getElementById(this.div + "_right_month");
	var left_classes = left_tab.classList;
	var right_classes = right_tab.classList;
	for (var l = 0; l < left_classes.length; l++) {
		left_tab.classList.remove(left_classes[l+1]);		
		left_tab.classList.remove(left_classes[l]);		
	}

	for (var r = 0; r < right_classes.length; r++) {
		right_tab.classList.remove(right_classes[r+1]);
		right_tab.classList.remove(right_classes[r]);
	}
	left_tab.classList.add(month, yr);
	right_tab.classList.add(month, yr);
};


/*
	The render function takes in a new date, and then figures out what day the 1st of that month falls on. From that, we can figure out how many rows of the calendar to use
	and which ones are greyed out
*/
DatePicker.prototype.render = function(new_date) {
	var date_obj = {};
	this.month = new_date.getMonth();
	this.year = new_date.getFullYear();
	date_obj.month = this.month + 1;
	date_obj.day = new_date.getDate();
	date_obj.year = this.year;

	this.callback(this.div, date_obj);

	var first = first_day(new_date);


	if (this.created_calendars === 0) {
		this.create_calendar(this.element);
	}

	this.render_calendar(new_date, first + 1);

};