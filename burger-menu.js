const header = document.querySelector('.header__navbar');
const body = document.querySelector('.body')
const burger = document.querySelector('.burger');
const menu = document.querySelector('.navbar').cloneNode(true);
const modal = document.querySelector('.modal')
const numberSubject = document.querySelector('.modal__number-subject')
const subject = document.querySelector('.name')
const homeTask = document.querySelector('.modal__textarea')
const mark = document.querySelector('.modal__mark')
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

modalCalendar.addEventListener('change', () => {
    for (let elem of form) {
        if (modalCalendar.value) {
            elem.disabled = false
        }
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
    }
})

modal.addEventListener('click', (e) => {
    if (!e.target.closest('.modal__body')) {
        modal.classList.remove('open')
        body.classList.remove('scroll')
    }
})

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.classList.remove('open')
        body.classList.remove('scroll')
    }
})

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

burger.addEventListener('click', modalHandler);

div.addEventListener('click', (e) => {
    if (!e.target.closest('.burger-menu')) {
        closeModal()
    }
})

btnSubmit.addEventListener('click', () => {
    fetch('http://157.230.108.157:3000/diary/lesson', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        subjectId: +subject.value, // id предмета
        date: modalCalendar.value,
        hometask: homeTask.value,
        mark: +mark.value,
        numberSubject: +numberSubject.value,
    })
})
modal.classList.remove('open')
        body.classList.remove('scroll')    
})