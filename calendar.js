
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


function addDays() {
    let currD = new Date(calendarDay.value)
    currD.setDate(currD.getDate() + 1);
    calendarDay.valueAsDate = currD;
}




const dateDay = document.querySelectorAll('#dates')
let dates = [];
function getWeekDates(d) {
    let day_milliseconds = 24 * 60 * 60 * 1000;

    let current_date = new Date(d);
    let monday = new Date(current_date.getTime() - (current_date.getDay() - 1) * day_milliseconds);

    for (let i = 0; i < 6; i++) {
        let cd = new Date(monday.getTime() + i * day_milliseconds)
        let year = cd.getFullYear()
        let month = cd.getMonth() + 1
        let day = cd.getDate()
        if (day < 10) {
            day = "0" + day
        }
        if (month < 10) {
            month = "0" + month
        }
        let t = `${day}.${month}.${year}`
        dates.push(t);
    }

    return dates;
}

prev.addEventListener('click', () => {
    let currD = new Date(calendarDay.value)
    currD.setDate(currD.getDate() - 1);
    calendarDay.valueAsDate = currD;
    dates = []
    getWeekDates(calendarDay.value)
    for (let i = 0; i <= dates.length; i++) {
        dateDay[i].innerHTML = dates[i]
    }
})

next.addEventListener('click', addDays)

getWeekDates(calendarDay.value)
calendarDay.addEventListener('change', () => {
    dates = []
    getWeekDates(calendarDay.value)
    for (let i = 0; i <= dates.length; i++) {
        dateDay[i].innerHTML = dates[i]
    }
})