const singInLink = document.querySelector(".header__profile");
const popupSigning = document.querySelector(".popup_type_singin");
const popupRegistraiting = document.querySelector(
  ".popup__form_type_registration"
);
const popupContainer = popupSigning.querySelector(".popup__container");
const formContainerList = popupSigning.querySelectorAll(
  ".popup__form-container"
);
const regSwitch = popupSigning.querySelector(".popup__switch_type_switch-reg");
const singInSwitch = popupSigning.querySelector(
  ".popup__switch_type_switch-singin"
);

const regFormNode = document.forms.registrationForm;
const formFieldsetList = regFormNode.querySelectorAll(".popup__fieldset");
const nextButton = regFormNode.querySelector(".popup__button_type_next");

// открыть попап
function openPopup(popupElement) {
  popupElement.classList.add("popup_active");
  slideLeftPopupContainer(popupContainer);
  document.addEventListener("keydown", escapeClose);
}

// закрыть попап
function closePopup(popupElement) {
  popupContainer.classList.add("slide");
  setTimeout(() => {
    popupContainer.classList.remove("slide");
    popupContainer.classList.remove("slide_direction_left");
    popupElement.classList.remove("popup_active");
  }, 500);
  document.removeEventListener("keydown", escapeClose);
}

// закрыть попап - Escape
function escapeClose(evt) {
  if (evt.key === "Escape") {
    popupContainer.classList.add("slide");
    setTimeout(() => {
      const openedPopup = document.querySelector(".popup_active");
      popupContainer.classList.remove("slide");
      popupContainer.classList.remove("slide_direction_left");
      openedPopup.classList.remove("popup_active");
    }, 500);
  }
}

// закрыть попап - overlay
function closeOverlay(event, popupElement) {
  if (event.target === event.currentTarget) {
    closePopup(popupElement);
  }
}

function slideLeftPopupContainer(popupContainer) {
  popupContainer.classList.add("slide");
  popupContainer.classList.add("slide_direction_left");
  setTimeout(() => {
    popupContainer.classList.remove("slide");
  }, 1000);
}

function switchForm(evt) {
  formContainerList.forEach((elem) => {
    elem.classList.toggle("popup__form-container_current");
  });
}

function switchFieldset(evt) {
  formFieldsetList.forEach((elem) => {
    elem.classList.toggle("popup__fieldset_current");
  });
}

singInLink.addEventListener("click", (evt) => {
  openPopup(popupSigning);
});

regSwitch.addEventListener("click", (evt) => {
  switchForm(evt);
});

singInSwitch.addEventListener("click", (evt) => {
  switchForm(evt);
});

nextButton.addEventListener("click", (evt) => {
  switchFieldset(evt);
});

form2.addEventListener("submit", () => closePopup(popupSigning));

popupSigning.addEventListener("click", () => closeOverlay(event, popupSigning));
