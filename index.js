const formNode = document.forms.poemForm;
const inputNode = formNode.elements.words;
const poemsContainer = document.querySelector('.poems-container');

function getPoem(keyWord) {
	 fetch(`http://buymebuyme.xyz?q=${keyWord}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((listOfPoems) => {    
      const poemElement = getRandomPoem(listOfPoems);
      const poemText = poemElement.fields.text;
      const poemAuthor = poemElement.fields.author;
      const poemTitle = poemElement.fields.name;
      console.log(poemTitle);
      console.log(poemAuthor);
      console.log(poemText);
      const poemParagraphNodeArray = createPoemPatagraphArray(poemText, keyWord);
      console.log(poemParagraphNodeArray);
      renderPoem(poemParagraphNodeArray, poemsContainer);
    })
    .catch((error) => {
      return Promise.reject(`Ошибка: ${error.status} - ${error.statusText}`);
    });
}

function createPoemPatagraphArray(poemText, keyWord) {
  let isDone = false;
  return poemText.split('\n').map((string) => {
    const poemParagraphNode = document.createElement('p');
    poemParagraphNode.classList.add('poem__paragraph');
    if(string.includes(keyWord) && !isDone) {
      isDone = true;
      const beforeAfterArray = string.split(keyWord);
      const poemSpanAccentNode = document.createElement('span');
      poemSpanAccentNode.classList.add('poem__accent');
      poemSpanAccentNode.textContent = keyWord;
      poemParagraphNode.append(beforeAfterArray[0], poemSpanAccentNode, beforeAfterArray[1]);
    } else {
      poemParagraphNode.textContent = string;
    }
    return poemParagraphNode;
    
  })

}

function renderPoem(poemParagraphNodeArray, container) {
  const poemElement = document.createElement('li');
  poemElement.classList.add('poem');
  container.append(poemElement);
  poemParagraphNodeArray.forEach((node) => {
    poemElement.append(node);
  }) 
  
}

function removePoems(container) {
  const poemsNodeList = [...container.querySelectorAll('.poem')];
  poemsNodeList.forEach((poem) => {
    poem.remove();
  })
}


function getRandomPoem(listOfPoems) {
  const index = Math.floor(Math.random() * listOfPoems.length);
  console.log(index);
  return listOfPoems[index];
}


formNode.addEventListener('submit', (evt) => {
  evt.preventDefault();
  console.log(inputNode.value.split(' '));
  removePoems(poemsContainer);
  inputNode.value.split(' ').forEach((elem) => {
    getPoem(elem);    
  })
});

