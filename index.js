function getPoem(keyWord) {
	return fetch(`http://buymebuyme.xyz?q=${keyWord}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
		.then((res) => {
			console.log(res[0].fields.text); // первый стих
    })
    .catch((res) => {
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
}

console.log(getPoem('борода'));

