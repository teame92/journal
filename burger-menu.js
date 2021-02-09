const header = document.querySelector('.header__navbar');
const body = document.querySelector('.body')
const burger = document.querySelector('.burger');
const menu = document.querySelector('.navbar').cloneNode(true);
const modal = document.querySelector('.modal')
const journal = document.querySelector('.journal__week')
const summary = document.querySelector('.summary-page')

document.addEventListener('click', (e) => {
    if (e.target.closest('.navbar__btn')) {
        modal.classList.add('open')
        body.classList.add('scroll')
    }
})

modal.addEventListener('click', (e) => {
    if (!e.target.closest('.modal__body')) {
        modal.classList.remove('open')
        body.classList.remove('scroll')
    }
})

document.addEventListener('click', (e) => {
    if (e.target.closest('.close')) {
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

document.addEventListener('click', (e) => {    
    if (e.target.closest('.this-week')) {
        summary.style.display = 'none'
        journal.style.display = 'flex'
    }
})

document.addEventListener('click', (e) => {
    
    if (e.target.closest('.final-marks')) {
        summary.style.display = 'flex'
        journal.style.display = 'none'
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
