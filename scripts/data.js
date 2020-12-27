const userNameNode = document.querySelector('.header__profile-enter');

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
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxl7q2Kq2-rqEZ9Wp6o44kIGNQ7TYagcPAgDshsa0uclv39rpc/exec";
const regForm = document.forms["registrationForm"];

regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(regForm) })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      if(response.result === 'success'){
        setUserCookie(response.name);
      }
    })
    .catch((error) => console.error("Error!", error.message));
});

function setUserCookie(userName){
  let cookieName = "name";
  document.cookie = encodeURIComponent(cookieName) + '=' + encodeURIComponent(userName);
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
  }
}




//  сохранение данных при входе в google таблице
const script3URL =
  "https://script.google.com/macros/s/AKfycbyo-ryBkORvjaBbbE-JsNG-LZ8mydau2Xg1QMeo35JHxJNBdvw/exec";
const signInForm = document.forms["signinForm"];

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(signInForm) })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response)
      if(response.access === 'allowed') {
        setUserCookie(response.userName);
      }
    })
    .catch((error) => console.error("Error!", error.message));
  })

autoriseUser('name');
