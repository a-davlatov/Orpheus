'use strict'

let lastScroll = 0
const bodyEl = document.body
const headerEl = document.querySelector('#header')
const navEl = document.querySelector('#nav')
const introEl = document.querySelector('#intro')
const burgerEl = document.querySelector('#burger')
let introElH = introEl.clientHeight
const defaultOffset = introElH

const scrollPosition = () => window.pageXOffset || document.documentElement.scrollTop
const containHide = () => headerEl.classList.contains('hide')

// Fixed header
window.addEventListener('scroll', () => {

    if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
        //scroll down
        headerEl.classList.add('hide')
    } else if (scrollPosition() < lastScroll && containHide()) {
        //scroll up
        headerEl.classList.remove('hide')
        headerEl.classList.add('fixed')
    } else if (scrollPosition() < defaultOffset) {
        headerEl.classList.remove('fixed')
    }

    lastScroll = scrollPosition()
})

// Smooth scroll
const navLinks = document.querySelectorAll('[data-scroll]');
navLinks.forEach((el) => {
    el.addEventListener('click', (evt) => {
        evt.preventDefault()

        const elementId = el.dataset.scroll
        const elementOffset = document.getElementById(elementId).offsetTop

        burgerEl.classList.remove('active');
        navEl.classList.remove('show');

        if (window.innerWidth <= 414) {
            window.scrollTo({
                top: elementOffset - 56,
                behavior: 'smooth'
            })
            return
        }

        window.scrollTo({
            top: elementOffset,
            behavior: 'smooth'
        })
    })
})

// Nav toggle
burgerEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    burgerEl.classList.toggle('active')
    navEl.classList.toggle('show')
});


// Show modal
const responseModalEl= document.querySelector('#modal_response')
const closeModalEl = document.querySelector('.modal__close')
const responseMsg = document.querySelectorAll('.response-msg')

function modalToggle(event) {
    event.preventDefault()
    responseModalEl.classList.toggle('show')
    bodyEl.classList.toggle('no-scroll')
}

responseMsg.forEach((el) => {
    el.addEventListener('click', (evt) => {
        modalToggle(evt)
    })
})

closeModalEl.addEventListener('click', (evt) => {
    modalToggle(evt)
})
responseModalEl.addEventListener('click', (evt) => {
    modalToggle(evt)
})

document.querySelector('.modal__dialog').addEventListener('click', (evt) => {
    evt.stopPropagation()
})


// Switch mode
function lightMode() {
    const wasLightMode = localStorage.getItem('lightMode') === 'true'

    localStorage.setItem('lightMode', !wasLightMode)
    bodyEl.classList.toggle('light-mode', !wasLightMode)
    burgerEl.classList.toggle('active')
    navEl.classList.toggle('show')
}

document.querySelector('.switch-mode').addEventListener('click', lightMode)

function onLoad() {
    bodyEl.classList.toggle('light-mode', localStorage.getItem('lightMode') === 'true')
}
document.addEventListener('DOMContentLoaded', onLoad)

