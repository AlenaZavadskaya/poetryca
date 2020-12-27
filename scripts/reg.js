const userNameNode = document.querySelector('.header__profile-enter');
const regForm = document.forms["registrationForm"];
const signInForm = document.forms["signinForm"];
const scriptURL = "https://script.google.com/macros/s/AKfycbxl7q2Kq2-rqEZ9Wp6o44kIGNQ7TYagcPAgDshsa0uclv39rpc/exec";

//  сохранение данных из поля ввода в google таблице
//const scriptURL ="https://script.google.com/macros/s/AKfycbySR1Xr-2Rx7LgI3-FiFBWYitKj-IaC7-WZ8qA8GFsM-jvqckz4/exec";
//const form = document.forms["generate"];
/*
form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => console.log("Success!", response))
    .catch((error) => console.error("Error!", error.message));
});*/

//сохранение данных при регистрации в google таблице

regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(regForm) })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      if(response.result === 'success'){
        setUserCookie(response.name, response.userId);
      }
    })
    .catch((error) => console.error("Error!", error.message));
});

function setUserCookie(userName, userId){
  let cookieName = "name";
  document.cookie = encodeURIComponent(cookieName) + '=' + encodeURIComponent(userName);
  let cookieID = 'userId';
  document.cookie = encodeURIComponent(cookieID) + '=' + encodeURIComponent(userId);
  autoriseUser(cookieName);
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function autoriseUser(cookieName){
  if(getCookie(cookieName)) {
    let userName = getCookie(cookieName)
    userNameNode.textContent = userName;
    //pastDataToProfileTemplates();
  }
}

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(signInForm) })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response)
      if(response.access === 'allowed') {
        setUserCookie(response.userName, response.userId);
      }
    })
    .catch((error) => console.error("Error!", error.message));
  })

autoriseUser('name');
