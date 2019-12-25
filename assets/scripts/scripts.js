$(document).ready(function() {
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
  var modalContainer = $('#modal-container');
  var yourPlans = $('#your-plans');
  var closePopup = $('#close-popup');
  var focusPeriod = $('#focus-period');
  var submitButton = $('#submit-plans');
  var cancelButton = $('#cancel-plans');

  var years = m.get('year').toString();
  var months = (m.month() + 1).toString();
  var date = m.date().toString();
  var key = years + months + date;

  var momentObject = {};
  var currentId = '';
  var currentSpanId = '';

  setKey();
  getKey();
  setColors();

  prev.on('click', function() {
    m.subtract(1, 'days');
    currentDateSpanEl.text(m.toString()); // change to more user friendly
    setKey();
    getKey();
  });

  next.on('click', function() {
    m.add(1, 'days');
    currentDateSpanEl.text(m.toString()); // change to more user friendly
    setKey();
    getKey();
  });

  customDateButton.on('click', function() {
    var yearValue = yearInput.val();
    var monthValue = monthInput.val();
    var dateValue = dateInput.val();
    m = m
      .year(yearValue)
      .month(monthValue)
      .date(dateValue);
    currentDateSpanEl.text(m.toString()); // change to more user friendly
    setKey();
    getKey();
  });

  function setKey() {
    years = m.get('year').toString();
    months =
      getPadding((m.month() + 1).toString()) + (m.month() + 1).toString();
    date = getPadding(m.date().toString()) + m.date().toString();
    key = years + months + date;
    setColors();
  }

  function getPadding(num) {
    return num < 10 ? '0' : '';
  }

  function setColors() {
    var currentMoment = moment();
    currentMoment.hour(12); //remove - for texting after 6pm purposes!!
    var currentHour = currentMoment.hour();
    for (var i = 0; i < periods.length; ++i) {
      var idNum = periods[i].id;
      idNum = parseInt(idNum.slice(15));
      if (idNum === currentHour) {
        //not jquery -change
        periods[i].classList.add('present');
      } else if (idNum < currentHour) {
        periods[i].classList.add('past');
      } else {
        periods[i].classList.add('future');
      }
    }
  }

  function getKey() {
    var plan = JSON.parse(localStorage.getItem(key));
    if (!plan) {
      for (var i = 0; i < periods.length; ++i) {
        var el = '#today' + (i + 9);
        $(el).text('');
      }
    } else {
      if (!plan.today9) {
        $('#today9').text('');
      } else {
        $('#today9').text(plan.today9);
      }
      if (!plan.today10) {
        $('#today10').text('');
      } else {
        $('#today10').text(plan.today10);
      }
      if (!plan.today11) {
        $('#today11').text('');
      } else {
        $('#today11').text(plan.today11);
      }
      if (!plan.today12) {
        $('#today12').text('');
      } else {
        $('#today12').text(plan.today12);
      }
      if (!plan.today13) {
        $('#today13').text('');
      } else {
        $('#today13').text(plan.today13);
      }
      if (!plan.today14) {
        $('#today14').text('');
      } else {
        $('#today14').text(plan.today14);
      }
      if (!plan.today15) {
        $('#today15').text('');
      } else {
        $('#today15').text(plan.today15);
      }
      if (!plan.today16) {
        $('#today16').text('');
      } else {
        $('#today16').text(plan.today16);
      }
      if (!plan.today17) {
        $('#today17').text('');
      } else {
        $('#today17').text(plan.today17);
      }
    }
  }

  periods.on('click', function() {
    currentId = '#' + $(this).attr('id');
    currentSpanId = currentId.slice(0, 6) + currentId.slice(16);
    modalContainer.removeClass('hide');
    yourPlans.val($(currentSpanId).text());
    yourPlans.focus();
  });

  submitButton.on('click', function() {
    setKey();
    var newText = yourPlans.val();
    $(currentSpanId).text(newText);
    for (var i = 0; i < periods.length; ++i) {
      momentObject['today' + (i + 9)] = $('#today' + (i + 9)).text();
    }
    modalContainer.addClass('hide');
    localStorage.setItem(key, JSON.stringify(momentObject));
    getKey();
  });

  cancelButton.on('click', function() {
    setKey();
    var newText = '';
    $(currentSpanId).text(newText);
    for (var i = 0; i < periods.length; ++i) {
      momentObject['today' + (i + 9)] = $('#today' + (i + 9)).text();
    }
    modalContainer.addClass('hide');
    localStorage.setItem(key, JSON.stringify(momentObject));
    getKey();
  });

  // function clickOnAPeriod(id) {
  //   setKey();
  //   for (var i = 0; i < periods.length; ++i) {
  //     if (periods[i].id === id) {
  //       modalContainer.removeClass('hide');
  //       var newText = prompt('what now?', $('#today' + (i + 9)).text());
  //       $('#today' + (i + 9)).text(newText);
  //       momentObject['today' + (i + 9)] = $('#today' + (i + 9)).text();
  //     } else {
  //       momentObject['today' + (i + 9)] = $('#today' + (i + 9)).text();
  //     }
  //   }
  //   localStorage.setItem(key, JSON.stringify(momentObject));
  //   getKey();
  // }

  closePopup.on('click', function() {
    modalContainer.addClass('hide');
  });
});
