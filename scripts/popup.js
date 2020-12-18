const singInLink = document.querySelector('.sing-in-link');
const popupNode = document.querySelector('.popup');
const popupContainer = popupNode.querySelector('.popup__container');
let currentForm = popupNode.querySelector('.popup__form_current');
let currentFormoggleFormBotton = currentForm.querySelector('.popup__button:not(.popup__button_curent)');
let hiddenForm = popupNode.querySelector('.popup__form:not(.popup__form_current)');
let hiddenFormtoggleFormBotton = hiddenForm.querySelector('.popup__button:not(.popup__button_curent)');

console.log(hiddenFormtoggleFormBotton);

function popupOpen (evt, popupElement) {
    evt.preventDefault();
    popupElement.classList.add('popup_active');
    popupContainerSlide(popupContainer)
}

function popupContainerSlide(popupContainer) {
    popupContainer.classList.add('slide');
}

function popupClose(evt, popupElement) {
    evt.preventDefault();
    popupElement.classList.remove('popup_active');
    popupContainer.classList.remove('slide');
}

function togglePopup(currentForm, hiddenForm) {
    currentForm.classList.remove('popup__form_current');
    hiddenForm.classList.add('popup__form_current');

}

singInLink.addEventListener('click', (evt) => {    
    popupOpen(evt, popupNode)
})

popupNode.addEventListener('click', (evt) => {
    if(!evt.target.closest('.popup__container')){
        popupClose(evt, popupNode);
    }
}) 

currentFormoggleFormBotton.addEventListener('click', (evt) => {
    evt.preventDefault();
    togglePopup(currentForm, hiddenForm)
})

