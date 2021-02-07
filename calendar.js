const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const calendarDay = document.querySelector('#date')

let time = new Date();
let year = time.getFullYear();
let month = time.getMonth() + 1;
let day = time.getDate()
if (day < 10) {
    day = "0" + day;
}
if (month < 10) {
    month = "0" + month;
}
let today = `${year}-${month}-${day}`;
calendarDay.value = today;

const dateDay = document.querySelectorAll('#dates')
let dates = [];

function getWeekDates(d) {    
    let dayMilliseconds = 24 * 60 * 60 * 1000;
    let current_date = new Date(d);
    let monday = new Date(current_date.getTime() - (current_date.getDay() - 1) * dayMilliseconds);

    for (let i = 0; i < 6; i++) {
        let weekDay = new Date(monday.getTime() + i * dayMilliseconds)
        let year = weekDay.getFullYear()
        let month = weekDay.getMonth() + 1
        let day = weekDay.getDate()
        if (day < 10) {
            day = "0" + day
        }
        if (month < 10) {
            month = "0" + month
        }
        let valueDay = `${day}.${month}.${year}`
        dates.push(valueDay);
    }
    return dates;
}

function setDays () {
    dates = []
    getWeekDates(calendarDay.value)
    for (let i = 0; i < dates.length; i++) {
        dateDay[i].innerHTML = dates[i]
    }
}

function changeDays(d = -1) {
    let currDay = new Date(calendarDay.value)
    currDay.setDate(currDay.getDate() + d);
    calendarDay.valueAsDate = currDay;
    setDays ()
}

prev.addEventListener('click', () => changeDays())

next.addEventListener('click', () => changeDays(1))

getWeekDates(calendarDay.value)

calendarDay.addEventListener('change', setDays)