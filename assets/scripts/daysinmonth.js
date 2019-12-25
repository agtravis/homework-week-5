// $(document).ready(function() {
var selectYear = $('#select-year');
var selectMonth = $('#select-month');
var selectDate = $('#select-date');
var daysInMonth = 31;

var newMoment = moment();
newMoment = newMoment.get('year');

for (var i = 1900; i <= 2100; ++i) {
  var newYearEl = $('<option>');
  newYearEl.val(i).text(i);
  selectYear.append(newYearEl);
  if (i === newMoment) {
    newYearEl.attr('selected', 'selected');
  }
}

calcDaysInMonth();

function calcDaysInMonth() {
  for (var i = 1; i <= daysInMonth; ++i) {
    var newDateEl = $('<option>');
    newDateEl.val(i).text(i);
    selectDate.append(newDateEl);
  }
}

selectYear.on('change', function() {
  // alert(selectYear.val());
  selectTheMonth();
});

selectMonth.on('change', function() {
  // alert(selectMonth.val());
  selectTheMonth();
});

function selectTheMonth() {
  selectDate.empty();
  var month = selectMonth.val();
  if (
    month === '00' ||
    month === '02' ||
    month === '04' ||
    month === '06' ||
    month === '07' ||
    month === '09' ||
    month === '11'
  ) {
    daysInMonth = 31;
  } else if (
    month === '03' ||
    month === '05' ||
    month === '08' ||
    month === '10'
  ) {
    daysInMonth = 30;
  } else if (
    month === '01' &&
    selectYear.val() % 4 === 0 &&
    selectYear.val() % 400 === 0
  ) {
    daysInMonth = 29;
  } else {
    daysInMonth = 28;
  }
  calcDaysInMonth();
}
// });
