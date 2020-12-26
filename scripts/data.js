//  сохранение данных из поля ввода в google таблице
const scriptURL =
  "https://script.google.com/macros/s/AKfycbySR1Xr-2Rx7LgI3-FiFBWYitKj-IaC7-WZ8qA8GFsM-jvqckz4/exec";
const form = document.forms["generate"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => console.log("Success!", response))
    .catch((error) => console.error("Error!", error.message));
});

//  сохранение данных при регистрации в google таблице
const script2URL =
  "https://script.google.com/macros/s/AKfycbxl7q2Kq2-rqEZ9Wp6o44kIGNQ7TYagcPAgDshsa0uclv39rpc/exec";
const form2 = document.forms["registrationForm"];

form2.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(script2URL, { method: "POST", body: new FormData(form2) })
    .then((response) => console.log("Success!", response))
    .catch((error) => console.error("Error!", error.message));
});


//  сохранение данных при входе в google таблице
const script3URL =
  "https://script.google.com/macros/s/AKfycbyo-ryBkORvjaBbbE-JsNG-LZ8mydau2Xg1QMeo35JHxJNBdvw/exec";
const form3 = document.forms["signinForm"];

form3.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(script3URL, { method: "POST", body: new FormData(form3) })
    .then((response) => console.log("Success!", response))
    .catch((error) => console.error("Error!", error.message));
});


