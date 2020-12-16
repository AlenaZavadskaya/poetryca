const main = document.querySelector('.main')



function download(link, content, fileName, contentType) {
  var file = new Blob([content], {type: contentType});
  link.href = URL.createObjectURL(file);
  link.download = fileName;
  
}

function addDownloadLink() {
  var a = document.createElement("a");
  a.textContent = 'Cкачать весь JSON c http://buymebuyme.xyz';
  main.append(a)
  return a;
}


function getAllData(){
  fetch(`http://buymebuyme.xyz`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
      
    })
    .then((data) => {  
      console.log(data);  
      download(addDownloadLink(), JSON.stringify(data), 'json.JSON', 'text/plain');
    })
    .catch((error) => {
      return Promise.reject(`Ошибка: ${error.status} - ${error.statusText}`);
    });
  }

getAllData();

