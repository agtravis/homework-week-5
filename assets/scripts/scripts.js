var selectYear = $('#select-year');
var selectMonth = $('#select-month');
var selectDate = $('#select-date');
var daysInMonth = 31;

for (var i = 1900; i <= 2100; ++i) {
  var newYearEl = $('<option>');
  newYearEl.val(i).text(i);
  selectYear.append(newYearEl);
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
  selectDate.empty();
  selectTheMonth();
});

selectMonth.on('change', selectTheMonth);

function selectTheMonth() {
  var month = selectMonth.val();
  if (
    month === 'January' ||
    month === 'March' ||
    month === 'May' ||
    month === 'July' ||
    month === 'August' ||
    month === 'October' ||
    month === 'December'
  ) {
    daysInMonth = 31;
  } else if (
    month === 'April' ||
    month === 'June' ||
    month === 'September' ||
    month === 'November'
  ) {
    daysInMonth = 30;
  } else if (
    month === 'February' &&
    selectYear.val() % 4 === 0 &&
    selectYear.val() % 400 === 0
  ) {
    daysInMonth = 29;
  } else {
    daysInMonth = 28;
  }
  selectDate.empty();
  calcDaysInMonth();
}

// while (answerButtonsElement.firstChild) {
//   answerButtonsElement.removeChild(answerButtonsElement.firstChild);
// }
