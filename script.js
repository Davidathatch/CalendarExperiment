var dayCards = document.querySelectorAll(".dayCard");
var weekRows = document.querySelectorAll(".weekRow");
var monthName = document.querySelector(".monthName");
var nextButton = document.querySelector(".nextButton");
var backButton = document.querySelector(".backButton");
var menuButton = document.querySelector(".menuButton");
var dropdown = document.querySelector(".dropdownMenu");
var menuBarThree = document.querySelector(".menuBarThree");
var menuBarTwo = document.querySelector(".menuBarTwo");
var dropdownItems = document.querySelectorAll(".dropdownItem");

var currentYear = [
  january = [],
  february = [],
  march = [],
  april = [],
  may = [],
  june = [],
  july = [],
  august = [],
  september = [],
  obtober = [],
  november = [],
  december = [],
];

var monthToString = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Creates week indexes shifted according to first day
//of year's day of week
function createShiftedWeek(startingDay) {
  var typicalWeek = [0, 1, 2, 3, 4, 5, 6];
  var shiftedWeek = [];

  currentIndex = startingDay;
  for (let i = 0; i < 7; i++) {
    if (currentIndex === 7) {
      currentIndex = 0;
    }
    shiftedWeek.push(typicalWeek[currentIndex]);
    currentIndex += 1;
  }

  return shiftedWeek;
}

function createMonths(isLeapyear, startingWeekDay) {
  var monthSizes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var shiftedWeekDays = createShiftedWeek(startingWeekDay);

  if (isLeapyear === true) {
    monthSizes[1] = 29;
  }

  var weekDayCounter = 0;
  //Loop through months
  for (let i = 0; i < 12; i++) {

    //Loop through number of days in current month

    for (let x = 0; x < monthSizes[i]; x++) {

      if (weekDayCounter === 7) {
        weekDayCounter = 0;
      }

      var currentDateMeta = {
        dayOfMonth: x + 1,
        dayOfWeek: shiftedWeekDays[weekDayCounter],
        holiday: [],
      }
      currentYear[i].push(currentDateMeta);
      weekDayCounter += 1;
    }
  }

}

function displayCalendar(chosenMonth) {
  monthName.innerHTML = monthToString[chosenMonth];
  liveMonth = currentYear[chosenMonth];
  dayShift = liveMonth[0]["dayOfWeek"];

  for (let i = 0; i < liveMonth.length; i++) {
    dayCards[liveMonth[i]["dayOfMonth"] + (dayShift - 1)].innerHTML = "<h2>" + liveMonth[i]["dayOfMonth"] + "</h2>";
    dayCards[liveMonth[i]["dayOfMonth"] + (dayShift - 1)].classList.remove("pastMonthCard");
  }

  for (let i = dayShift - 1; i >= 0; i--) {
    if (chosenMonth !== 0) {
      var previousMonth = currentYear[chosenMonth - 1];
      fillInDate = previousMonth[previousMonth.length - (i + 1)]["dayOfMonth"];
      dayCards[i].innerHTML = "<h2>" + fillInDate + "</h1>";
      dayCards[i].classList.add("pastMonthCard");
    } else {
      dayCards[i].classList.add("pastMonthCard");
      dayCards[i].innerHTML = "<h2></h2>";
    }

  }

  counter = 0;
  for (let i = liveMonth[liveMonth.length - 1]["dayOfMonth"] + (dayShift); i < dayCards.length; i++) {
    nextMonth = currentYear[chosenMonth + 1];
    if (chosenMonth !== 11) {
      dayCards[i].innerHTML = "<h2>" + nextMonth[counter]["dayOfMonth"] + "</h2>";
      dayCards[i].classList.add("pastMonthCard");
      counter++;
    } else {
      dayCards[i].classList.add("pastMonthCard");
      dayCards[i].innerHTML = "<h2></h2>";
    }
  }
}

backButton.addEventListener("click", function () {
  if (currentMonth >= 1) {
    currentMonth--;
    displayCalendar(currentMonth);
  } else {
    alert("Sorry, this is as far as you can go😥");
  }
})

nextButton.addEventListener("click", function () {
  if (currentMonth >= 0 && currentMonth <= 10) {
    currentMonth++;
    displayCalendar(currentMonth);
  } else {
    alert("Sorry, this is as far as you can go😥");
  }
})

menuButton.addEventListener("click", function () {
  dropdown.classList.toggle("dropdownHidden");
  menuBarThree.classList.toggle("dropdownHidden");
  menuBarTwo.classList.toggle("dropdownHidden");
})

for (let x = 0; x < dropdownItems.length; x++) {
  dropdownItems[x].addEventListener("click", function (e) {
    var monthClickedIndex = parseInt(e.currentTarget.classList[1]);
    currentMonth = monthClickedIndex;
    displayCalendar(currentMonth);
    dropdown.classList.toggle("dropdownHidden");
    menuBarThree.classList.toggle("dropdownHidden");
    menuBarTwo.classList.toggle("dropdownHidden");
  })
}

currentMonth = 0;
createMonths(false, 5);
displayCalendar(currentMonth);