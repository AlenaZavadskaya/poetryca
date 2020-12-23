const singInLink = document.querySelector('.header__profile');
const popupSingInNode = document.querySelector('.popup_type_singin');
const popupContainer = popupSingInNode.querySelector('.popup__container');
const formContainerList = popupSingInNode.querySelectorAll('.popup__form-container');
const regSwitch = popupSingInNode.querySelector('.popup__button_type_switch-reg');
const singInSwitch = popupSingInNode.querySelector('.popup__button_type_switch-singIn');


function openPopup(evt, popupElement) {
    evt.preventDefault();
    popupElement.classList.add('popup_active');
    slideLeftPopupContainer(popupContainer)
}

function slideLeftPopupContainer(popupContainer) {
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

function switchForm(evt) {
    formContainerList.forEach(elem => {
        elem.classList.toggle('popup__form-container_current')
    })
}

singInLink.addEventListener('click', (evt) => {    
    openPopup(evt, popupSingInNode)
})

popupSingInNode.addEventListener('click', (evt) => {
    if(!evt.target.closest('.popup__container')){
        popupClose(evt, popupSingInNode);
    }
}) 

regSwitch.addEventListener('click', (evt) => {
    switchForm(evt);
})

singInSwitch.addEventListener('click', (evt) => {
    switchForm(evt);
})