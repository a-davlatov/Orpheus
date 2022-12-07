'use strict'

let lastScroll = 0;
const bodyEl = document.body
const headerEl = document.querySelector('#header')
const introEl = document.querySelector('#intro')
const burgerEl = document.querySelector('#burger')
let introElH = introEl.clientHeight;
const defaultOffset = introElH;

const scrollPosition = () => window.pageXOffset || document.documentElement.scrollTop;
const containHide = () => headerEl.classList.contains('hide');

// Fixed header
window.addEventListener('scroll', () => {

    if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
        //scroll down
        headerEl.classList.add('hide');
    } else if (scrollPosition() < lastScroll && containHide()) {
        //scroll up
        headerEl.classList.remove('hide');
        headerEl.classList.add('fixed');
    } else if (scrollPosition() < defaultOffset) {
        headerEl.classList.remove('fixed');
    }

    lastScroll = scrollPosition();
});

// Smooth scroll
const navLinks = document.querySelectorAll('[data-scroll]');
navLinks.forEach((el) => {
    el.addEventListener('click', (evt) => {
        evt.preventDefault();

        const elementId = el.dataset.scroll;
        const elementOffset = document.getElementById(elementId).offsetTop;

        // burgerEl.classList.remove('clicked');
        // headerEl.classList.remove('show');
        // bodyEl.classList.remove('no-scroll');

        if (window.innerWidth <= 414) {
            window.scrollTo({
                top: elementOffset - 56,
                behavior: 'smooth'
            });
            return;
        }

        window.scrollTo({
            top: elementOffset,
            behavior: 'smooth'
        });
    });
});

const responseModalEl= document.querySelector('#modal_response')
const closeModalEl = document.querySelector('.modal__close')
const communityLink = document.querySelector('#community')

communityLink.addEventListener('click', (evt) => {
    evt.preventDefault();
    responseModalEl.classList.add('show');
    bodyEl.classList.add('no-scroll');
});
closeModalEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    responseModalEl.classList.remove('show');
    bodyEl.classList.remove('no-scroll');
});
responseModalEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    responseModalEl.classList.remove('show');
    bodyEl.classList.remove('no-scroll');
});

document.querySelector('.modal__dialog').addEventListener('click', (evt) => {
    evt.stopPropagation();
});

function lightMode() {
    const wasLightMode = localStorage.getItem('lightMode') === 'true'

    localStorage.setItem('lightMode', !wasLightMode)
    bodyEl.classList.toggle('light-mode', !wasLightMode)
}

document.querySelector('.switch-mode').addEventListener('click', lightMode)

function onLoad() {
    bodyEl.classList.toggle('light-mode', localStorage.getItem('lightMode') === 'true')
}
document.addEventListener('DOMContentLoaded', onLoad)

