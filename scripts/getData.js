//  зарос на получение данных ипута из google таблицы в формате json
function getData() {
  return fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/18msT1_mxFbYUzReCGgMYNFNBzwOROwPHCD-Irq10cSM/values/B2:B?key=AIzaSyDCpvPFFXvd8w0snHFqUPjo3hs5SNpm4z4"
  )
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      let phrase = res.values;
      return phrase;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}


// отрисовываем на странице последние данные, сохраненные из инпута
function pastDataToProfile() {
  getData()
    .then((data) => {
      const lastFive = data.slice(Math.max(data.length - 5, 1));
      lastFive.forEach((element) => {
        const requestList = document.createElement("li");
        const container = document.querySelector(".profile__templates");
        requestList.classList.add("profile__templates-element");
        requestList.textContent = element;
        container.append(requestList);
      });
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

pastDataToProfile();


//  запрос на получение данных пользователя при входе
function getUser() {
  return fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1Ac-YNAcqNKSJSRH6FWoklfC3KlqDdsYjwa9wM-6kRXw/values/B2:B?key=AIzaSyDCpvPFFXvd8w0snHFqUPjo3hs5SNpm4z4"
  )
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
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

putDataToProfile();

//  запрос на получение данных при регистрации
function getUserData() {
  return fetch(
    "https://spreadsheets.google.com/feeds/cells/1OnRWfNHL13x5DjbkNEqoLYW9y0iMg4vZqFz6iizGDms/1/public/full?alt=json"
  )
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

// getUserData();



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
