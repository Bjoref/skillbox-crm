export const modalEvents = () => {
    showButton.addEventListener('click', showModal)
    background.addEventListener('click', hideModal)
}

const showButton = document.getElementById('addClient');
const background = document.getElementById('background');
const modal = document.getElementById('modal');

const showModal = () => {
    document.querySelector('body').classList.add('hide-overflow-x');
    background.classList.add('d-block');
    modal.classList.add('d-block');
}

const hideModal = () => {
    document.querySelector('body').classList.remove('hide-overflow-x');
    background.classList.remove('d-block');
    modal.classList.remove('d-block');
}