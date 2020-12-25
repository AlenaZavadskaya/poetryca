//  сохранение данных из поля ввода в таблице
const scriptURL =
  "https://script.google.com/macros/s/AKfycbySR1Xr-2Rx7LgI3-FiFBWYitKj-IaC7-WZ8qA8GFsM-jvqckz4/exec";
const form = document.forms["generate"];

form.addEventListener("submit", (e) => {
  debugger;
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => console.log("Success!", response))
    .catch((error) => console.error("Error!", error.message));
});

// function getData() {
// 	fetch (("https://cors-anywhere.herokuapp.com/" + scriptURL), { method: 'GET' })
// 		// .then(response => console.log('Success!', response))
// 		// .catch(error => console.error('Error!', error.message))

// 		.then(res => {
// 			debugger
// 			if (res.ok) {
// 				return res.json(); // возвращаем результат работы метода и идём в следующий then
// 			}

// 			// если ошибка, отклоняем промис
// 			return Promise.reject(`Ошибка: ${res.status}`);
// 		});
// }

// getData();


// localstorage для попапа
const input = document.querySelector(".content__form-input");
const container = document.querySelector(".profile__templates-element");

input.value = localStorage.getItem("content__form-input");
input.oninput = () => {
  localStorage.setItem("content__form-input", input.value);
  localStorage.setItem("profile__templates-element", input.value);
};

const inputName = document.querySelector(".popup__input_type_text");
const inputTel = document.querySelector(".popup__input_type_tel");
const inputEmail = document.querySelector(".popup__input_type_email");
const inputPassword = document.querySelector(".popup__input_type_password");
const inputPassRepeat = document.querySelector(
  ".popup__input_type_password-repeat"
);
const inputEmailEnter = document.querySelector("#userName");
const inputPasswordEnter = document.querySelector("#password");

inputName.value = localStorage.getItem("popup__input_type_text");
inputName.oninput = () => {
  localStorage.setItem("popup__input_type_text", inputName.value);
  localStorage.setItem("header__profile-enter", inputName.value);
};

inputTel.value = localStorage.getItem("popup__input_type_tel");
inputTel.oninput = () => {
  localStorage.setItem("popup__input_type_tel", inputTel.value);
};

inputEmail.value = localStorage.getItem("popup__input_type_email");
inputEmail.oninput = () => {
  localStorage.setItem("popup__input_type_email", inputEmail.value);
};

inputPassword.value = localStorage.getItem("popup__input_type_password");
inputPassword.oninput = () => {
  localStorage.setItem("popup__input_type_password", inputPassword.value);
};

inputPassRepeat.value = localStorage.getItem(
  "popup__input_type_password-repeat"
);
inputPassRepeat.oninput = () => {
  localStorage.setItem(
    "popup__input_type_password-repeat",
    inputPassRepeat.value
  );
};

inputEmailEnter.value = localStorage.getItem("#userName");
inputEmailEnter.oninput = () => {
  localStorage.setItem("#userName", inputEmailEnter.value);
  localStorage.setItem("header__profile-enter", inputEmailEnter.value);
};

inputPasswordEnter.value = localStorage.getItem("#password");
inputPasswordEnter.oninput = () => {
  localStorage.setItem("#password", inputPasswordEnter.value);
};

// костыль, работающий
const user = document.querySelector(".header__profile-enter");
// user.textContent = inputName.value;
user.textContent = inputEmailEnter.value;


