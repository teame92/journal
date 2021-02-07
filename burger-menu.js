const header = document.querySelector('.header__navbar');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.navbar').cloneNode(true);
const date = document.querySelector('.header__date')

function addModal () {
    const btn = document.querySelectorAll('.navbar__btn') 
    const modal = document.querySelector('.modal')
    const closeBtn = document.querySelector('.close')
    
    for (let i of btn) {
    i.addEventListener('click', (e) => {
        e.preventDefault()
        modal.classList.add('open')
    })}
    modal.addEventListener('click', (e) => {
        if (!e.target.closest('.modal__body')) {
            modal.classList.remove('open')
        }
    })
    closeBtn.addEventListener('click', (e) => {
        modal.classList.remove('open')
    })
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('open')
        }
    })
}

function createHash () {
    const week = document.querySelectorAll('.this-week')
    const finalMarks =document.querySelectorAll('.final-marks')
    const journal = document.querySelector('.journal__week')
    const summary = document.querySelector('.summary-page')

    for (let key of week) {
    key.addEventListener('click', (e) => {
        e.preventDefault()
        summary.style.display = 'none'
        journal.style.display = 'flex'   
    })}

    for (let k of finalMarks) {
    k.addEventListener('click', (e) => {
        e.preventDefault()
        summary.style.display = 'flex'
        journal.style.display = 'none'    
    })}
}

addModal ()
createHash ()

let div = document.createElement('div');
let openModal = false;
div.classList.add('overlay');
div.insertAdjacentHTML('afterbegin', `<div class="burger-menu"></div>`);
div.firstElementChild.append(menu);

menu.style.display = 'flex';
menu.style.flexDirection = 'column';
menu.style.justifyContent = 'space-evenly';
menu.style.height = '30%';
menu.style.margin = 'auto';

function closeModal() {
    div.remove();
    header.prepend(burger);
    date.classList.remove('active__date')
    burger.classList.remove('burger-rotate');
    openModal = false;
}

function modalHandler() {
    if (openModal) {
        closeModal();
        return;
    }
    
    div.firstElementChild.prepend(burger);
    document.body.append(div);
    date.classList.add('active__date')
    burger.classList.add('burger-rotate');
    menu.addEventListener('click', closeModal);
    openModal = true;
    
    addModal ()
    createHash ()      
} 
  
burger.addEventListener('click', modalHandler);

div.addEventListener('click', (e) => {
    if (!e.target.closest('.burger-menu')) {
        closeModal()
    }
})
