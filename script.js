// const btn = document.querySelector('.navbar__btn') 
// const modal = document.querySelector('.modal')
// const closeBtn = document.querySelector('.close')

// btn.addEventListener('click', (e) => {
//     e.preventDefault()
//     modal.classList.add('open')
// })
// modal.addEventListener('click', (e) => {
//     if (!e.target.closest('.modal__body')) {
//         modal.classList.remove('open')
//     }
// })
// closeBtn.addEventListener('click', (e) => {
//     modal.classList.remove('open')
// })
// window.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape') {
//         modal.classList.remove('open')
//     }
// })

const marks = document.querySelectorAll('.marks')
let allMarks = []
for (let i of marks) {
    allMarks = []
    const qmark = i.querySelectorAll('.qmark')
    const ymark = i.querySelector('.ymark')
    for (let j of qmark) {
     allMarks.push(j.innerHTML)
    }
    let total = 0;
    for (let x of allMarks) {
        total += (+x)
    }
    ymark.innerHTML= Math.round(total/allMarks.length)    
}


// const week = document.querySelectorAll('.this-week')
// const finalMarks =document.querySelectorAll('.final-marks')
// const journal = document.querySelector('.journal__week')
// const summary = document.querySelector('.summary-page')

// for (let key of week) {
// key.addEventListener('click', (e) => {
//     e.preventDefault()
//     summary.style.display = 'none'
//     journal.style.display = 'flex'   
// })}

// for (let k of finalMarks) {
// k.addEventListener('click', (e) => {
//     e.preventDefault()
//     summary.style.display = 'flex'
//     journal.style.display = 'none'    
// })}



