
function lightMode() {
    const bodyEl = document.body
    const wasLightMode = localStorage.getItem('lightMode') === 'true'

    localStorage.setItem('lightMode', !wasLightMode)
    bodyEl.classList.toggle('light-mode', !wasLightMode)
}

document.querySelector('.switch-mode').addEventListener('click', lightMode)

function onLoad() {
    document.body.classList.toggle('light-mode', localStorage.getItem('lightMode') === 'true')
}
document.addEventListener('DOMContentLoaded', onLoad)