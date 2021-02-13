// calendar 
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const calendarDay = document.querySelector('#date')
const journal = document.querySelector('.journal__week')
const summary = document.querySelector('.summary-page')
const dateDay = document.querySelectorAll('#dates')
const weekDays = document.querySelectorAll('.journal__date-day')

const allSubject = {
    "4": 'Англ. яз.',
    "5": 'Бел. лит.',
    "6": 'Бел. яз.',
    "7": 'Биология',
    "8": 'Всемир. ист.',
    "9": 'География',
    "10": 'ДП/МП',
    "11": 'Информ.',
    "12": 'Ист. Бел.',
    "13": 'Матем.',
    "14": 'Обществов.',
    "15": 'Рус. лит.',
    "16": 'Рус. яз.',
    "17": 'Физика',
    "18": 'Физ. к. и зд.',
    "19": 'Химия',
}

const tbody = document.querySelectorAll('.tbody')
const journalDay = document.querySelectorAll('#dates')

async function getJournal() {
    for (let j = 0; j < tbody.length - 1; j++) {
        let tr = tbody[j].querySelectorAll('tr')
        for (let z of tr) {
            z.querySelector('.ht div').innerHTML = ""
            z.querySelector('.lesson').innerHTML = ""
            z.querySelector('.mark').innerHTML = ""
        }
      await  fetch('https://157.230.108.157:3000/diary/lesson?date=' + journalDay[j].innerHTML)
            .then((resp) => resp.json())
            .then((data) => {
                for (let g = 0; g < data.length; g++) {
                    let ht = tr[g].querySelector('.ht div')
                    let lesson = tr[g].querySelector('.lesson')
                    let mark = tr[g].querySelector('.mark')
                    ht.innerHTML = data[g].hometask
                    if (data[g].mark === 0) {
                        mark.innerHTML = ""
                    } else {
                        mark.innerHTML = data[g].mark
                    }
                    lesson.innerHTML = allSubject[data[g].subjectId]
                }
            })
    }
}

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
    getJournal()
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
    getJournal()
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

// burger-menu

const header = document.querySelector('.header__navbar');
const body = document.querySelector('.body')
const burger = document.querySelector('.burger');
const menu = document.querySelector('.navbar').cloneNode(true);
const modal = document.querySelector('.modal')
const numberSubject = document.querySelector('.modal__number-subject')
const subject = document.querySelector('.name')
const homeTask = document.querySelector('.modal__textarea')
const modalMark = document.querySelector('.modal__mark')
const btnSubmit = document.querySelector('.submit')
const modalCalendar = document.querySelector('.modal__calendar')
const form = document.forms[0]

function disabled() {
    for (let elem of form) {
        if (elem.classList.contains('disabled') && !modalCalendar.value) {
            elem.disabled = true
        }
    }
}

disabled()

let div = document.createElement('div');
let openModal = false;
div.classList.add('overlay');
div.insertAdjacentHTML('afterbegin', `<div class="burger-menu"></div>`);
div.firstElementChild.append(menu);
let span = document.createElement('span')
span.classList.add('fake-span')

menu.style.display = 'flex';
menu.style.flexDirection = 'column';
menu.style.justifyContent = 'space-evenly';
menu.style.height = '30%';
menu.style.margin = 'auto';

function closeModal() {
    div.remove();
    span.remove()
    header.prepend(burger);
    body.classList.remove('scroll')
    burger.classList.remove('burger-rotate');
    openModal = false;
}

function modalHandler() {
    if (openModal) {
        closeModal();
        return;
    }
    header.prepend(span)
    body.classList.add('scroll')
    div.firstElementChild.prepend(burger);
    document.body.append(div);
    burger.classList.add('burger-rotate');
    menu.addEventListener('click', closeModal);
    openModal = true;
}

modalCalendar.addEventListener('change', () => {
    for (let elem of form) {
        if (modalCalendar.value) {
            elem.disabled = false
        }
    }
})

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.classList.remove('open')
        body.classList.remove('scroll')
    }
})

document.addEventListener('click', (e) => {
    if (e.target.closest('.navbar__btn')) {
        for (let elem of form) {
            if (elem.classList.contains('disabled') && modalCalendar) {
                modalCalendar.value = ''
                elem.value = ''
            }
        }
        disabled()
        modal.classList.add('open')
        body.classList.add('scroll')
    } else if (e.target.closest('.close')) {
        modal.classList.remove('open')
        body.classList.remove('scroll')
    } else if (e.target.closest('.modal')) {
        if (!e.target.closest('.modal__body')) {
            modal.classList.remove('open')
            body.classList.remove('scroll')
        }
    } else if (e.target.closest('.burger')) {
        modalHandler()
    } else if (e.target.closest('.overlay')) {
        if (!e.target.closest('.burger-menu')) {
            closeModal()
        }
    }
})
 function getSubject () {
    fetch('https://157.230.108.157:3000/diary/lesson', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            subjectId: +subject.value, // id предмета
            date: modalCalendar.value,
            hometask: homeTask.value,
            mark: +modalMark.value,
            numberSubject: +numberSubject.value,
        })
    })
    modal.classList.remove('open')
    body.classList.remove('scroll')
    getJournal()
}
btnSubmit.addEventListener('click', getSubject)

// Total Page 
class TotalPage {

    constructor() {
        this.marks = document.querySelectorAll('.marks')
        this.allMarks = []
    }
    setMarks () {
        for (let i of this.marks) {
            this.allMarks = []
            this.qmark = i.querySelectorAll('.qmark')
            this.ymark = i.querySelector('.ymark')
        
            if (this.qmark[this.qmark.length - 1].innerHTML) {
                for (let j of this.qmark) {
                    this.allMarks.push(j.innerHTML)
                }        
                let total = 0
                for (let x of this.allMarks) {
                    total += (+x)
                }
                this.ymark.innerHTML = Math.round(total / this.allMarks.length)
            } else {
                this.ymark.innerHTML = ''
            }
        }
    }
}

let page = new TotalPage()
page.setMarks()
