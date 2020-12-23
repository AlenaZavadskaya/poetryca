const singInLink = document.querySelector('.header__profile');
const popupSingInNode = document.querySelector('.popup_type_singin');
const popupContainer = popupSingInNode.querySelector('.popup__container');
const popupRegInNode = document.querySelector('.popup_type_registration');
const popupRegContainer = popupRegInNode.querySelector('.popup__container');

const regButton = popupSingInNode.querySelector('.popup__button:not(.popup__button_curent)')

function popupOpen (evt, popupElement) {
    evt.preventDefault();
    popupElement.classList.add('popup_active');
    popupContainerSlide(popupContainer)
}

function popupContainerSlide(popupContainer) {
    popupContainer.classList.add('slide');
    popupContainer.classList.add('slide_direction_left');
    setTimeout(() => {
        popupContainer.classList.remove('slide');
    }, 1000);
}

function popupClose(evt, popupElement) {
    evt.preventDefault();
    
    popupContainer.classList.add('slide');
    setTimeout(() => {
        popupContainer.classList.remove('slide');
        popupContainer.classList.remove('slide_direction_left');
        popupElement.classList.remove('popup_active');
    }, 500);
    
}

singInLink.addEventListener('click', (evt) => {    
    popupOpen(evt, popupSingInNode)
})

popupSingInNode.addEventListener('click', (evt) => {
    if(!evt.target.closest('.popup__container')){
        popupClose(evt, popupSingInNode);
    }
}) 
/*
regButton.addEventListener('click', (evt) => {
    popupClose();
})*/