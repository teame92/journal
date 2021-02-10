const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const calendarDay = document.querySelector('#date')
const journal = document.querySelector('.journal__week')
const summary = document.querySelector('.summary-page')

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

// if (localStorage.getItem('hash')) {
//     location.hash = localStorage.getItem('hash');
// } else {
//     location.hash = `#${calendarDay.value}`
// }



const dateDay = document.querySelectorAll('#dates')
const weekDays = document.querySelectorAll('.journal__date-day')
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

function getWeekDates(d) {
    let dayMilliseconds = 24 * 60 * 60 * 1000;
    let current_date = new Date(d);
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

let checkHash = true

function hash() {
    localStorage.setItem('date', calendarDay.value);
}

function setDays() {
    dates = []
    getWeekDates(calendarDay.value)
    for (let i = 0; i < dates.length; i++) {
        dateDay[i].innerHTML = dates[i]
        weekDays[i].innerHTML = days[i]
    }
    if (checkHash) {
        location.hash = `#${calendarDay.value}`        
        // localStorage.setItem('hash', location.hash);
    }
    hash()
}



document.addEventListener('click', (e) => {
    if (e.target.closest('.this-week')) {
        checkHash = true
        location.hash = `#${calendarDay.value}`
        // localStorage.setItem('hash', location.hash);
    }
})

document.addEventListener('click', (e) => {
    if (e.target.closest('.final-marks')) {
        checkHash = false
        location.hash = '#marks'
        // localStorage.setItem('hash', location.hash);
    }
})

function changeDays(d = -1, func) {
    let currDay = new Date(calendarDay.value)
    currDay.setDate(currDay.getDate() + d);
    calendarDay.valueAsDate = currDay;
    if (checkHash) {
        location.hash = `#${calendarDay.value}`        
        // localStorage.setItem('hash', location.hash);
    }
    func()
    hash()
}

getWeekDates(calendarDay.value)

function mobileDay() {
    let mDay = new Date(calendarDay.value);
    let mWeekDay = mDay.getDay() - 1
    if (mWeekDay === -1) mWeekDay = 6
    dateDay[0].innerHTML = calendarDay.value
    weekDays[0].innerHTML = days[mWeekDay]
    hash()
}

function nextD() {
    changeDays(1, setDays)
}
function prevD() {
    changeDays(-1, setDays)
}
function nextMobD() {
    changeDays(1, mobileDay)
}
function preMobD() {
    changeDays(-1, mobileDay)
}

const mediaQuery = window.matchMedia('(max-width: 497px)')

function handleTabletChange(e) {
    if (e.matches) {
        calendarDay.removeEventListener('change', setDays)
        calendarDay.addEventListener('change', mobileDay)
        prev.removeEventListener('click', prevD)
        next.removeEventListener('click', nextD)
        prev.addEventListener('click', preMobD)
        next.addEventListener('click', nextMobD)
        mobileDay()
    } else {
        calendarDay.removeEventListener('change', mobileDay)
        calendarDay.addEventListener('change', setDays)
        prev.addEventListener('click', prevD)
        next.addEventListener('click', nextD)
        prev.removeEventListener('click', preMobD)
        next.removeEventListener('click', nextMobD)
        setDays()
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
    }
}

window.addEventListener('hashchange', changeLocation);
changeLocation();