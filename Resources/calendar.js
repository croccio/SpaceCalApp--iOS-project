// Taking Screen Width
var screenWidth = 322;
var needToChangeSize = false;

var screenWidthActual = Ti.Platform.displayCaps.platformWidth;

var currentGrid = new Array();

// Main Window of the Month View.
var mainView = Ti.UI.createView({
	backgroundColor : '#FF000000',
	navBarHidden : true
});

// Button at the buttom side
var backButton = Ti.UI.createButton({
	bottom : '20dp',
	height : '40dp',
	width : '200dp'
});

// Previous Button - Tool Bar
var prevMonth = Ti.UI.createButton({
	width : 'auto',
	height : 'auto',
	title : '' ,
	left : '15dp',
	image:"images/freccia2.png",
	backgroundImage:"null",
});

// next Button - Tool Bar
var nextMonth = Ti.UI.createButton({
	width : 'auto',
	height : 'auto',
	title : '' ,
	right:'15dp',
	image:"images/freccia.png",
	backgroundImage:"null",
});

// Month Title - Tool Bar
var monthTitle = Ti.UI.createLabel({
	width : '200dp',
	height : '24dp',
	textAlign : 'center',
	color : '#3a4756',
	font : {
		fontSize : 20,
		fontWeight : 'bold'
	}
});

// Tool Bar
var toolBar = Ti.UI.createView({
	top : '0dp',
	width : '322dp',
	height : '50dp',
	backgroundImage : 'images/gradient_barramese.jpg',
	layout : 'vertical'
});

// Tool Bar - View which contain Title Prev. &amp; Next Button
var toolBarTitle = Ti.UI.createView({
	top : '3dp',
	width : '322dp',
	height : '24dp'
});

toolBarTitle.add(prevMonth);
toolBarTitle.add(monthTitle);
toolBarTitle.add(nextMonth);

// Tool Bar - Day's
var toolBarDays = Ti.UI.createView({
	top : '2dp',
	width : '322dp',
	height : '22dp',
	layout : 'horizontal',
	left : '-1dp'
});

toolBarDays.sunday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Sun',
	width : '46dp',
	textAlign : 'center',
	font : {
		fontSize : 12,
		fontWeight : 'bold'
	},
	color : '#3a4756'
});

toolBarDays.monday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Mon',
	width : '46dp',
	textAlign : 'center',
	font : {
		fontSize : 12,
		fontWeight : 'bold'
	},
	color : '#3a4756'
});

toolBarDays.tuesday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Tue',
	width : '46dp',
	textAlign : 'center',
	font : {
		fontSize : 12,
		fontWeight : 'bold'
	},
	color : '#3a4756'
});

toolBarDays.wednesday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Wed',
	width : '46dp',
	textAlign : 'center',
	font : {
		fontSize : 12,
		fontWeight : 'bold'
	},
	color : '#3a4756'
});

toolBarDays.thursday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Thu',
	width : '46dp',
	textAlign : 'center',
	font : {
		fontSize : 12,
		fontWeight : 'bold'
	},
	color : '#3a4756'
});

toolBarDays.friday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Fri',
	width : '46dp',
	textAlign : 'center',
	font : {
		fontSize : 12,
		fontWeight : 'bold'
	},
	color : '#3a4756'
});

toolBarDays.saturday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Sat',
	width : '46dp',
	textAlign : 'center',
	font : {
		fontSize : 12,
		fontWeight : 'bold'
	},
	color : '#3a4756'
});

toolBarDays.add(toolBarDays.sunday);
toolBarDays.add(toolBarDays.monday);
toolBarDays.add(toolBarDays.tuesday);
toolBarDays.add(toolBarDays.wednesday);
toolBarDays.add(toolBarDays.thursday);
toolBarDays.add(toolBarDays.friday);
toolBarDays.add(toolBarDays.saturday);

// Adding Tool Bar Title View &amp; Tool Bar Days View
toolBar.add(toolBarTitle);
toolBar.add(toolBarDays);

// Function which create day view template
dayView = function(e) {
	var label = Ti.UI.createLabel({
		current : e.current,
		width : '46dp',
		height : '44dp',
		backgroundColor : '#FFDCDCDF',
		text : e.day,
		textAlign : 'center',
		color : e.color,
		backgroundImage:"images/cal_button_notpressed.jpg",
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		}
	});
	return label;
};

var iscurrentDate = function(a, b){
	
	var date = new Date();
	var m = date.getMonth() ;
	var yy = date.getYear();
	var year = (yy < 1000) ? yy + 1900 : yy;
	
	
	
	if (a === year && b === m )
		return true;
	else
		return false;
}

monthName = function(e) {
	switch(e) {
		case 0:
		e = 'January';
		break;
		case 1:
		e = 'February';
		break;
		case 2:
		e = 'March';
		break;
		case 3:
		e = 'April';
		break;
		case 4:
		e = 'May';
		break;
		case 5:
		e = 'June';
		break;
		case 6:
		e = 'July';
		break;
		case 7:
		e = 'August';
		break;
		case 8:
		e = 'September';
		break;
		case 9:
		e = 'October';
		break;
		case 10:
		e = 'November';
		break;
		case 11:
		e = 'December';
		break;
	};
	return e;
};

// Calendar Main Function
var calView = function(a, b, c) {
	Ti.API.info("anno " + a +" mese "+b+" giorno "+c);
	
	var nameOfMonth = monthName(b);
	
	//create main calendar view
	var mainView = Ti.UI.createView({
		layout : 'horizontal',
		width : '322dp',
		height : 'auto',
		top : '50dp'
	});
	
	//set the time
	var daysInMonth = 32 - new Date(a, b, 32).getDate();
	var dayOfMonth = new Date(a, b, c).getDate();
	var dayOfWeek = new Date(a, b, 1).getDay();
	var daysInLastMonth = 32 - new Date(a, b - 1, 32).getDate();
	var daysInNextMonth = (new Date(a, b, daysInMonth).getDay()) - 6;
	
	//set initial day number
	var dayNumber = daysInLastMonth - dayOfWeek + 1;
	
	//get last month's days
	for ( i = 0; i<dayOfWeek; i++) {
		mainView.add(new dayView({
			day : dayNumber,
			color : '#8e959f',//color number 
			current : 'no',
			dayOfMonth : ''
		}));
		dayNumber++;
	};
	
	// reset day number for current month
	dayNumber = 1;
	
	//get this month's days
	for ( i = 0; i<daysInMonth; i++) { 
		var newDay = new dayView({
			day : dayNumber,
			color : '#3a4756', 
			current : 'yes', 
			dayOfMonth : dayOfMonth 
		});
		mainView.add(newDay);
		if (newDay.text == dayOfMonth && iscurrentDate(a , b)) {
			newDay.color = 'white';
			// newDay.backgroundImage='../libraries/calendar/pngs/monthdaytiletoday_selected.png';
			newDay.backgroundImage = "images/cal_button_pressed.jpg";
			var oldDay = newDay;

		};
					if(i < 20 && i > 15){
				newDay.backgroundImage = "images/triangolo_giallo.png";
			}
			if (i>25 && i < 28){
				newDay.backgroundImage = "images/triangolo_rosso.png";
			}
		currentGrid[i]=newDay;
		
		dayNumber++; 
	}; 
	dayNumber = 1; //get remaining month's days 
	Ti.API.info("daysInNextMonth = " + daysInNextMonth);
	for (var i = 0; i > daysInNextMonth; i--) {
		
		mainView.add(new dayView({
			day : dayNumber,
			color : '#8e959f',
			current : 'no',
			dayOfMonth : ''
		}));
		dayNumber++;
	};
	
	// this is the new "clicker" function, although it doesn't have a name anymore, it just is.
	mainView.addEventListener('click', function(e) {
		if (e.source.current == 'yes') {
			// reset last day selected
			
			try{
				if (oldDay.text == dayOfMonth) {
					oldDay.color = 'white';
					// oldDay.backgroundImage='../libraries/calendar/pngs/monthdaytiletoday.png';
					oldDay.backgroundColor = '#FFFFF000';
				} else {
					oldDay.color = '#3a4756';
					// oldDay.backgroundImage='../libraries/calendar/pngs/monthdaytile-Decoded.png';
					oldDay.backgroundColor = '#FFDCDCDF'
				}
				oldDay.backgroundPaddingLeft = '0dp';
				oldDay.backgroundPaddingBottom = '0dp';
			}catch(e){
				Ti.API.info(e)
			}
			
			// set window title with day selected, for testing purposes only
			backButton.title = nameOfMonth + ' ' + e.source.text + ', ' + a;
			
			// set characteristic of the day selected
			if (e.source.text == dayOfMonth) {
				// e.source.backgroundImage='../libraries/calendar/pngs/monthdaytiletoday_selected.png';
				e.source.backgroundColor = '#FFFF00FF';
			} else {
				// e.source.backgroundImage='../libraries/calendar/pngs/monthdaytile_selected.png';
				e.source.backgroundColor = '#FFFF0000';
			}
			e.source.backgroundPaddingLeft = '1dp';
			e.source.backgroundPaddingBottom = '1dp';
			e.source.color = 'white';
			//this day becomes old :(
			oldDay = e.source;
		}
	});
	
	return mainView;
};

// what's today's date?
var setDate = new Date();
a = setDate.getFullYear();
b = setDate.getMonth();
c = setDate.getDate();

// add the three calendar views to the window for changing calendars with animation later

var prevCalendarView = null;

if (b == 0) {
	prevCalendarView = calView(a - 1, 11, c);
} else {
	prevCalendarView = calView(a, b - 1, c);
}

prevCalendarView.left = (screenWidth * -1) + 'dp';

var nextCalendarView = null;

if (b == 0) {
	nextCalendarView = calView(a + 1, 0, c);
} else {
	nextCalendarView = calView(a, b + 1, c);
}

nextCalendarView.left = screenWidth + 'dp';

var thisCalendarView = calView(a, b, c);

if (needToChangeSize == false) {
	thisCalendarView.left = '-1dp';
}

monthTitle.text = monthName(b) + ' ' + a;

backButton.title = monthName(b) + ' ' + c + ', ' + a;

// add everything to the window
mainView.add(toolBar);
mainView.add(thisCalendarView);
mainView.add(nextCalendarView);
mainView.add(prevCalendarView);
mainView.add(backButton);

// yeah, open the window, why not?

var slideNext = Titanium.UI.createAnimation({
	// left : '-322',
	duration : 500
});

slideNext.left = (screenWidth * -1);

var slideReset = Titanium.UI.createAnimation({
	// left : '-1',
	duration : 500
});

if (needToChangeSize == false) {
	slideReset.left = '-1';
} else {
	slideReset.left = ((screenWidth - 644) / 2);
}

var slidePrev = Titanium.UI.createAnimation({
	// left : '322',
	duration : 500
});

slidePrev.left = screenWidth;

// Next Month Click Event
nextMonth.addEventListener('click', function() {
	if (b == 11) {
		b = 0;
		a++;
	} else {
		b++;
	}
	
	thisCalendarView.animate(slideNext);
	nextCalendarView.animate(slideReset);
	
	setTimeout(function() {
		thisCalendarView.left = (screenWidth * -1) + 'dp';
		if (needToChangeSize == false) {
			nextCalendarView.left = '-1dp';
		} else {
			nextCalendarView.left = ((screenWidth - 644) / 2);
		}
		prevCalendarView = thisCalendarView;
		thisCalendarView = nextCalendarView;
		if (b == 11) {
			nextCalendarView = calView(a + 1, 0, c);
		} else {
			nextCalendarView = calView(a, b + 1, c);
		}
		monthTitle.text = monthName(b) + ' ' + a;
		nextCalendarView.left = screenWidth + 'dp';
		mainView.add(nextCalendarView);
	}, 500);
});

// Previous Month Click Event
prevMonth.addEventListener('click', function() {
	if (b == 0) {
		b = 11;
		a--;
	} else {
		b--;
	}
	
	thisCalendarView.animate(slidePrev);
	prevCalendarView.animate(slideReset);
	setTimeout(function() {
		thisCalendarView.left = screenWidth + 'dp';
		if (needToChangeSize == false) {
			prevCalendarView.left = '-1dp';
		} else {
			prevCalendarView.left = ((screenWidth - 644) / 2);
		}
		nextCalendarView = thisCalendarView;
		thisCalendarView = prevCalendarView;
		if (b == 0) {
			prevCalendarView = calView(a - 1, 11, c);
		} else {
			prevCalendarView = calView(a, b - 1, c);
		}
		monthTitle.text = monthName(b) + ' ' + a;
		prevCalendarView.left = (screenWidth * -1) + 'dp';
		mainView.add(prevCalendarView);
	}, 500);
});

mainView.getInformation = function(from, to , currentMounth, currentYear){
	var jsonCall = require("jsonCall").JsonCall;
	splitFrom = parseInt(from.split("/"));
	splitTo = parseInt(to.split("/"));
	
	var lengthMount = function(){
		if (currentMounth === 2){
			return 28;
		}else if (currentMounth%2 === 0){
			return 30;
		}else return 31;
	}();
	
	
	jsonCall(from, to,function(arr){
		Ti.API.info(JSON.stringify(currentGrid));
		// for(var i = 1; i <= lengthMount; i++){
			for(var i = 1; i <= 5; i++){
			//try{
				
				// var arrOfDay = arr[currentYear-2000][currentMounth][i];
				Ti.API.info(arr);
				alert(JSON.stringify(arr));
				if(arr[currentYear-2000][currentMounth][i].length > 0){
					Ti.API.info('sono dentro');
					currentGrid[i].backgroundImage="appicon.png";
				}
			// }catch (e){
				Ti.API.info("1");
			//}
		}
	}, function(e){
		Ti.API.info('ERROREEEE');
	});
}




exports.calendar = mainView;
