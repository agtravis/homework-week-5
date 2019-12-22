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

setKey();
// getKey();
setColors();

prev.on('click', function() {
  m.subtract(1, 'days');
  currentDateSpanEl.text(m.toString());
  setKey();
  //   getKey();
});

next.on('click', function() {
  m.add(1, 'days');
  currentDateSpanEl.text(m.toString());
  setKey();
  //   getKey();
});

customDateButton.on('click', function() {
  var yearValue = yearInput.val();
  var monthValue = monthInput.val();
  var dateValue = dateInput.val();
  m = m
    .year(yearValue)
    .month(monthValue)
    .date(dateValue);
  currentDateSpanEl.text(m);
  setKey();
  // getKey();
});

function setKey() {
  years = m.get('year').toString();
  months = getPadding((m.month() + 1).toString()) + (m.month() + 1).toString();
  date = getPadding(m.date().toString()) + m.date().toString();
  key = years + months + date;
  setColors();
}

function getPadding(num) {
  return num < 10 ? '0' : '';
}

function setColors() {
  var currentMoment = moment();
  currentMoment.hour(12); //remove!!
  var currentHour = currentMoment.hour();
  for (var i = 0; i < periods.length; ++i) {
    var idNum = periods[i].id;
    idNum = parseInt(idNum.slice(15));
    if (idNum === currentHour) {
      //not jquery
      periods[i].classList.add('present');
    } else if (idNum < currentHour) {
      periods[i].classList.add('past');
    } else {
      periods[i].classList.add('future');
    }
  }
}
