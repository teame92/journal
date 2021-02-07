const header = document.querySelector('.header__navbar');

const burger = document.querySelector('.burger');
const menu = document.querySelector('.navbar').cloneNode(true);
burger.addEventListener('click', modalHandler);

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


function modalHandler(e) {
    if (openModal) {
        closeModal();
        return;
    }
    
    div.firstElementChild.prepend(burger);
    document.body.append(div);
    burger.classList.add('burger-rotate');
    menu.addEventListener('click', closeModal);
    openModal = true;

    function closeModal() {
        div.remove();
        header.prepend(burger);
        burger.classList.remove('burger-rotate');
        openModal = false;
    }
} 
  
