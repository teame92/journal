const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const calendarDay = document.querySelector('#date')
const journal = document.querySelector('.journal__week')
const summary = document.querySelector('.summary-page')
const dateDay = document.querySelectorAll('#dates')
const weekDays = document.querySelectorAll('.journal__date-day')

function correctDay(q) {
    if (q < 10) {
        q = '0' + q;
        return q
    }
    return q
}

let time = new Date();
let year = time.getFullYear();
let month = time.getMonth() + 1;
let day = time.getDate()
let today = `${year}-${correctDay(month)}-${correctDay(day)}`;

if (localStorage.getItem('date')) {
    calendarDay.value = localStorage.getItem('date');
} else {
    calendarDay.value = today;
}

let dates = [];
let days = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
]

function getWeekDates(setDay) {
    let dayMilliseconds = 24 * 60 * 60 * 1000;
    let current_date = new Date(setDay);
    let monday = new Date(current_date.getTime() - (current_date.getDay() - 1) * dayMilliseconds);

    for (let i = 0; i < 6; i++) {
        let weekDay = new Date(monday.getTime() + i * dayMilliseconds)
        let year = weekDay.getFullYear()
        let month = weekDay.getMonth() + 1
        let day = weekDay.getDate()
        let valueDay = `${year}-${correctDay(month)}-${correctDay(day)}`
        dates.push(valueDay);
    }
    return dates;
}

getWeekDates(calendarDay.value)

let checkHash = true

function setLocal() {
    localStorage.setItem('date', calendarDay.value);
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.this-week')) {
        checkHash = true
        location.hash = `#${calendarDay.value}`
    } else if (e.target.closest('.final-marks')) {
        checkHash = false
        location.hash = '#marks'
    }
})

function changeDays(changeDay = -1, func) {
    let currDay = new Date(calendarDay.value)
    currDay.setDate(currDay.getDate() + changeDay);
    calendarDay.valueAsDate = currDay;
    if (checkHash) {
        location.hash = `#${calendarDay.value}`
    }
    func()
    setLocal()
}

function getDescWeek() {
    dates = []
    getWeekDates(calendarDay.value)
    for (let i = 0; i < dates.length; i++) {
        dateDay[i].innerHTML = dates[i]
        weekDays[i].innerHTML = days[i]
    }
    if (checkHash) {
        location.hash = `#${calendarDay.value}`
    }
    setLocal()
}

function getMobileDay() {
    let mDay = new Date(calendarDay.value);
    let mWeekDay = mDay.getDay() - 1
    if (mWeekDay === -1) mWeekDay = 6
    dateDay[0].innerHTML = calendarDay.value
    weekDays[0].innerHTML = days[mWeekDay]
    if (checkHash) {
        location.hash = `#${calendarDay.value}`
    }
    setLocal()
}

function nextD() {
    changeDays(1, getDescWeek)
}
function prevD() {
    changeDays(-1, getDescWeek)
}
function nextMobD() {
    changeDays(1, getMobileDay)
}
function preMobD() {
    changeDays(-1, getMobileDay)
}

const mediaQuery = window.matchMedia('(max-width: 497px)')

function handleTabletChange(e) {
    if (e.matches) {
        calendarDay.removeEventListener('change', getDescWeek)
        calendarDay.addEventListener('change', getMobileDay)
        prev.removeEventListener('click', prevD)
        next.removeEventListener('click', nextD)
        prev.addEventListener('click', preMobD)
        next.addEventListener('click', nextMobD)
        getMobileDay()
    } else {
        calendarDay.removeEventListener('change', getMobileDay)
        calendarDay.addEventListener('change', getDescWeek)
        prev.addEventListener('click', prevD)
        next.addEventListener('click', nextD)
        prev.removeEventListener('click', preMobD)
        next.removeEventListener('click', nextMobD)
        getDescWeek()
    }
}

mediaQuery.addListener(handleTabletChange)

handleTabletChange(mediaQuery)

function changeLocation() {
    switch (location.hash) {
        case `#${calendarDay.value}`:
            summary.style.display = 'none'
            journal.style.display = 'flex'
            break;
        case '#marks':
            summary.style.display = 'flex'
            journal.style.display = 'none'
            break;
        default:
            summary.style.display = 'none'
            journal.style.display = 'flex'
            calendarDay.value = location.hash.slice(1)
            if (!mediaQuery.matches) {
                getDescWeek()
            } else {
                getMobileDay()
            }
    }
}

window.addEventListener('hashchange', changeLocation);
changeLocation();