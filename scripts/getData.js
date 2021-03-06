const templatePopup = document.querySelector('.popup_type_template');
templatePopup.addEventListener("click", (event) => closeOverlay(event, templatePopup));
//  зарос на получение данных ипута из google таблицы в формате json
function getData() {
  return fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/18msT1_mxFbYUzReCGgMYNFNBzwOROwPHCD-Irq10cSM/values/A1:C?key=AIzaSyDCpvPFFXvd8w0snHFqUPjo3hs5SNpm4z4"
  )
    .then((response) => response.json())
    .then((res) => {
      let phrase = res.values;
      console.log(phrase);
      return phrase;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

// отрисовываем на странице пользователя последние запросы, сохраненные из инпута
function pastDataToProfileTemplates() {
  getData()
    .then((data) => {
      //Id пользователя
      let userId = getCookie('userId');
      let userExcerptList = data.reduce((result, elem) => {
        if(elem[0] === userId) {
          result.push([elem[1], elem[2]]);
        } 
        return result;
      }, [])
      console.log(userExcerptList);
      const lastFive = userExcerptList.slice(Math.max(userExcerptList.length - 5, 1));
      userExcerptList.forEach((element) => {
        const requestList = document.createElement("li");
        const container = document.querySelector(".profile__templates");
        requestList.classList.add("profile__templates-element");
        requestList.textContent = element[0];
        container.append(requestList);
        requestList.addEventListener('click', () => {
          openPopup(templatePopup);
          const popupContainer = templatePopup.querySelector('.popup__container');
          let parNode = document.createElement('p');
          parNode.classList.add('popup__paragraph');
          parNode.textContent = element[1];
          popupContainer.append(parNode);
        })
      });
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

pastDataToProfileTemplates();



//  запрос на получение данных пользователя при входе
function getUser() {
  return fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1Ac-YNAcqNKSJSRH6FWoklfC3KlqDdsYjwa9wM-6kRXw/values/B2:B?key=AIzaSyDCpvPFFXvd8w0snHFqUPjo3hs5SNpm4z4"
  )
    .then((response) => response.json())
    .then((res) => {
      let user = res.values;
      return user;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

// отрисовываем на странице последние данные, сохраненные из инпута
function putDataToProfile() {
  getUser()
		.then((data) => {
      const currentUser = data[data.length - 1];
      document.querySelector(
        ".header__profile-enter"
      ).textContent = currentUser;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

//putDataToProfile();

//  запрос на получение данных при регистрации
function getUserData() {
  return fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1OnRWfNHL13x5DjbkNEqoLYW9y0iMg4vZqFz6iizGDms/values/B2:F?key=AIzaSyDCpvPFFXvd8w0snHFqUPjo3hs5SNpm4z4"
  )
    .then((response) => response.json())
    .then((res) => {
      // console.log(res);
      let user = res.values;
      return user;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

//getUserData();


// при входе проверяем есть ли такой зарегистрированный пользователь
// если нет, то предлагаем зарегистрироваться
/*form3.addEventListener("submit", (e) => {
  e.preventDefault();
  getUserData()
		.then((data) => {
      const usersList = data;
      const inputEmail = form3.querySelector("#name").value;
      const inputPassword = form3.querySelector("#password").value;
      const inputsArray = [inputEmail, inputPassword];
      const str = usersList.toString().split(",");
      const comparing = inputsArray.every((ai) => str.includes(ai));
      if (comparing === true) {
        document.querySelector(
          ".header__profile-enter"
        ).textContent = inputEmail;
				closePopup(popupSigning);
        return;
      } else {
        switchForm(e);
      }
    })
    .catch((error) => console.error("Error!", error.message));
});*/



//  сбор данных из сервиса sheety (ограниченное кол-во запросов)
// запасной вариант
// не используется
function getDataSheety() {
  fetch(
    "https://api.sheety.co/2f181410692d9f6393bb28e1f0ab2015/poetryWords/sheet1"
  )
    .then((response) => response.json())
    .then((json) => {
      // Do something with the data
      console.log(json.sheet1[0].words);
    });
}

// getDataSheety(console.log("test1"));
