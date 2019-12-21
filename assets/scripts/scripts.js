var currentDateSpanEl = $('#current-date-span');

var m = moment();

currentDateSpanEl.text(m.toString()); // change to more user friendly

var prev = $('#prev');
var next = $('#next');
var yearInput = selectYear;
var monthInput = selectMonth;
var dateInput = selectDate;
var customDateButton = $('#button-custom-date');
var periods = $('.period');

var years = m.get('year').toString();
var months = (m.month() + 1).toString();
var date = m.date().toString();
var key = years + months + date;

var momentObject = {};

// setKey();
// getKey();
// setColors();

prev.on('click', function() {
  m.subtract(1, 'days');
  currentDateSpanEl.text(m.toString());
});
