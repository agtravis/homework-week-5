$(document).ready(function() {
  var currentDateSpanEl = $('#current-date-span');

  var m = moment();

  currentDateSpanEl.text(
    m.get('month') + 1 + '/' + m.get('date') + '/' + m.get('year')
  );

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
  var submitButton = $('#submit-plans');
  var cancelButton = $('#cancel-plans');
  var focusPeriod = $('#focus-period');

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
    prevFunction();
  });

  $(document).on('keyup', function(event) {
    if (event.key === 'ArrowLeft') {
      prevFunction();
    }
    if (event.key === 'ArrowRight') {
      nextFunction();
    }
  });

  function prevFunction() {
    m.subtract(1, 'days');
    currentDateSpanEl.text(
      m.get('month') + 1 + '/' + m.get('date') + '/' + m.get('year')
    );
    setKey();
    getKey();
  }

  next.on('click', function() {
    nextFunction();
  });

  function nextFunction() {
    m.add(1, 'days');
    currentDateSpanEl.text(
      m.get('month') + 1 + '/' + m.get('date') + '/' + m.get('year')
    );
    setKey();
    getKey();
  }

  customDateButton.on('click', function() {
    var yearValue = yearInput.val();
    var monthValue = monthInput.val();
    var dateValue = dateInput.val();
    m = m
      .year(yearValue)
      .month(monthValue)
      .date(dateValue);
    currentDateSpanEl.text(
      m.get('month') + 1 + '/' + m.get('date') + '/' + m.get('year')
    );
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
    // currentMoment.hour(12); // make comment a line of code for coding and testing before 9am / after 6pm purposes!!
    var currentHour = currentMoment.hour();
    for (var i = 0; i < periods.length; ++i) {
      var idNum = periods[i].id;
      idNum = parseInt(idNum.slice(15));
      if (idNum === currentHour) {
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
      var values = Object.values(plan);
      for (var i = 0; i < values.length; ++i) {
        if (values[i] === '') {
          $('#today' + (i + 9)).text('');
        } else {
          $('#today' + (i + 9)).text(values[i]);
        }
      }
    }
  }

  periods.on('click', function() {
    currentId = '#' + $(this).attr('id');
    currentSpanId = currentId.slice(0, 6) + currentId.slice(16);
    var currentTimeSlot = currentSpanId.slice(6);
    if (currentTimeSlot >= 13) {
      currentTimeSlot = currentTimeSlot - 12 + 'pm';
    } else if (currentTimeSlot <= 11) {
      currentTimeSlot = currentTimeSlot + 'am';
    } else {
      currentTimeSlot = currentTimeSlot + 'noon';
    }
    focusPeriod.text(currentTimeSlot);
    modalContainer.removeClass('hide');
    yourPlans.val($(currentSpanId).text());
    yourPlans.focus();
  });

  submitButton.on('click', function() {
    submitFunction();
  });

  yourPlans.on('keyup', function(event) {
    if (event.key === 'Enter') {
      submitFunction();
    }
  });

  function submitFunction() {
    setKey();
    var newText = yourPlans.val();
    $(currentSpanId).text(newText);
    for (var i = 0; i < periods.length; ++i) {
      momentObject['today' + (i + 9)] = $('#today' + (i + 9)).text();
    }
    modalContainer.addClass('hide');
    localStorage.setItem(key, JSON.stringify(momentObject));
    getKey();
  }

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

  closePopup.on('click', function() {
    modalContainer.addClass('hide');
  });
});
