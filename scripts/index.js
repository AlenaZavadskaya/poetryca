const pageNode = document.querySelector('.page'); 
const formNode = document.forms.generate;
const inputNode = formNode.elements.words;
const poemsContainer = document.querySelector('#poem-box');
const poemTemplate = document.querySelector('#poem-template').content;
const buttonsContainer = document.querySelector('#activeButtons');
const activeButtons = document.querySelector('#buttons').content;
//Тут храним последние слова из ненайденной фразы
let findingArray = [];

//***ЭТА ФУНКЦИЯ ЗАПУСКАЕТ ПОСЛЕДОВАТЕЛЬНОСТЬ ВЫВОДА СТИХОТВОЕНИЙ
//***ПРОБЛЕМА ЧТО fetch ЖДЕТ promise И ОСТАЛЬНОЕ РАБОТАЕТ ПОСЛЕДОВАТЕЛЬНО ЧЕРЕЗ then
//***И Я НЕ МОГУ ПОВТОРНО ИСПОЛЬЗОВАТЬ ЭТУ ФУНКЦИЮ ДЛЯ ОБНОВЛЕНИЯ ОДНОГО ОТВЫВКА */
//***КОНКРЕТНО Я НЕ МОГУ ВСТАВИТЬ НОВЫЙ ОТРЫВОК ВМЕСТО СТАРОГО */
//***ИЛИ ВПИСЫВАТЬ НОВЫЙ if 
//***ИЛИ КАК-ТО ВЕРНУТЬ promise ДЛЯ ДАЛЬНЕЙШЕГО ИСПОЛЬЗОВАНИЯ */
//***КАК В СИНХРОННОЙ ПРОГРАММЕ */
//Рекурсивная функция
function getPoem(keyPhrase) {
  console.log('Начали поиск по фразе: ' + keyPhrase[0]);
  //Базовый случай 
  if(keyPhrase.length === 0) {
    //тут прерываем выполнение программы
    return;
  } 
  //Рекурсивный случай
  //Массив хранения элементов одной поэмы
  //Тут хранить массив строк (p) одной поэмы
  fetch(`https://buymebuyme.xyz?q=${keyPhrase[0]}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((listOfPoems) => {
      let phrase = keyPhrase[0];
      //Если есть результат
      if(listOfPoems.length > 0) {      
        //Переменная хранения результата
        let resultPoemObject = returnPoemResult(listOfPoems);
        //Вхождение точно есть
        //Разбиваем неразмеченный текст на фразы
        //И добавляем в массив объектов для формирования Одной поэмы
        //Добавляем в результат для вывода
        // И ищем остальные слова в найденном тексте
        let poemText = resultPoemObject.fields.text;
        const poemAuthor = resultPoemObject.fields.author;
        const poemTitle = resultPoemObject.fields.name;
        let poemTextList = poemText.split('\n');
        //Очищаем текст от аннотаций
        
        let [clearPoemTextList, annots] = clearPoemAnnots(poemTextList);
        let poemElements = addPoemParts(clearPoemTextList, annots);
        //Удаляем последний пустой элемент
        poemElements.pop();

        //Показываем стихотворение
        renderPoem(poemElements, poemsContainer, phrase, poemAuthor, poemTitle);
        //Проверяем missingWords.length
        //Если после разметки что-то осталось, то 
        if(findingArray.length !== 0) {
          let newPrase = findingArray.join(' ');
          findingArray = []
          findingArray[0] = newPrase;    
          getPoem(findingArray);
        }
      } else {
        //Если не нашли полное вхождение
        //Разбиваем фразу на массив по пробелам
        let firstWordsList = findingArray[0].split(' ');
     
        if(firstWordsList.length > 1) {
          //Фраза состоит из нескольких слов
          //Выдергиваем последнее и формируем новый массив
          let lastWord = firstWordsList.pop();
          let firstWords = firstWordsList.join(' ');
          findingArray.splice(0, 1, firstWords, lastWord);
          console.log('не нашли ' + findingArray)
          //Рекурсивно ищем то что получили
          getPoem(findingArray);         
        } else {
          //В этом блоке мы не нашли входение
          //И слов у нас 1 или нет
          //Возвращаем блок отрывка с текстом ошибки "не найдено!"
          const noFindMessageNode = document.createElement('p');
          noFindMessageNode.classList.add('poem-box__paragraph', 'poem__paragraph_error');
          noFindMessageNode.textContent = 'Извините, мы не нашли такое слово...';
          let noFindMessageNodeList = []
          noFindMessageNodeList.push(noFindMessageNode); 
          renderPoem(noFindMessageNodeList, poemsContainer, phrase);
        }
      }
    })
    .catch((error) => {
      return Promise.reject(`Ошибка: ${error.status} - ${error.statusText}`);
    });
}

function clearPoemAnnots(poemTextList) {
  let annots = [];
  let clearPoemTextList = [];
  poemTextList.forEach((string) => {
    if(!string.startsWith('[')) {
      clearPoemTextList.push(string);
    } else {
      annots.push(string);
    }
  })
  return [clearPoemTextList, annots];
}

function checkPoemResult(listOfPoems) {
  if(listOfPoems.length === 1) {
    //Если имеет только одни вариант
    //возвращаем его
    return listOfPoems[0];
  } else {
    //Вариантов несколько
    //Тут проверяем все варианты на последнее пользовательское стихотворение,
    //Если оно было
    //То показываем другое случайное
    //И все что в предыдущем блоке
   return getRandomPoem(listOfPoems);          
  }  
}

function addPoemParts(stringElementArray, annots) {
  //Функция наполняет poemElements размечными тегами p
  //со строками стиха
  //Базовый случай
  let poemElements = [];
  if(stringElementArray.length === 0) {
    return '';
  }
  //Разделяем текст на массив по строчкам
  //И возвращаем массив элементров поэмы
  let poemParagraphNode = document.createElement('p');
  poemParagraphNode.classList.add('poem-box__paragraph');
  //Ищем вхождение
  if(stringElementArray[0].includes(findingArray[0])) {
    //Разделяем текст на ["до", 'вхождение', 'после']
    const beforeAfterArray = stringElementArray[0].split(findingArray[0]);
     //Сохдаем span для выделения входжения
    const poemSpanAccentNode = document.createElement('span');
    poemSpanAccentNode.classList.add('content__accent');
    poemSpanAccentNode.textContent = findingArray[0];
    let [afterText, annot=''] = addAnnots(beforeAfterArray[1], annots);
    //Добавляем в результат элементов поэмы тест "до" и span с вхождением
    poemParagraphNode.append(beforeAfterArray[0], poemSpanAccentNode, afterText, annot);
    //Удаляем первое значение из поискового массива
    findingArray.shift();
  } 
  else {
     //Не нашли входение в итераци добаляем просто текст
    //poemParagraphNode.textContent = stringElementArray[0]; 
    poemParagraphNode.classList.add('poem-box__paragraph', 'poem-box__paragraph_notaccent', 'hidden');
    let [afterText, annot=''] = addAnnots(stringElementArray[0], annots);
    //Добавляем в результат элементов поэмы тест "до" и span с вхождением
    poemParagraphNode.append(afterText, annot);

  } 
  poemElements.push(poemParagraphNode); 
  stringElementArray.shift();
  //Поиск по остаткам
  let newPoemElements = addPoemParts(stringElementArray, annots);
  return poemElements.concat(newPoemElements);
}

function addAnnots(text, annots) {
  let [resText, resSpan] = [text, '']
  if(text.endsWith(']')){
    annots.forEach((annot, index) => {

      let annotNumb = `[${index + 1}]`;
      let annotList = annot.split(annotNumb);
      if(text.endsWith(annotNumb)) {
        text = text.slice(0, text.indexOf(annotNumb));
        const span = document.createElement('span');
        span.title = annotList[1];
        span.textContent = annotNumb;
        [resText, resSpan] = [text, span];
      }   
    })
  }
  return [resText, resSpan]
};

function renderPoem(poemElements, container, keyPhrase, author = '', title = '', ) {
  let poemBoxPoemNode = poemTemplate.cloneNode(true);
  poemBoxPoemNode.querySelector('.poem-box__poem').dataset.phrase = keyPhrase;
  if(poemElements.length == 1 && poemElements[0].classList.contains('poem__paragraph_error')) {
    const likeButton = poemBoxPoemNode.querySelector('.poem-box__but-box').remove();;
  }
  if(author && title) {
    const poemAutorTiileNode = poemBoxPoemNode.querySelector('.poem-box__author');
    poemAutorTiileNode.textContent = author + ', ' + title;
  }
  let poemTextBoxNode = poemBoxPoemNode.querySelector('.poem-box__text');
  poemElements.forEach((node) => {
    poemTextBoxNode.append(node);
	})
	buttonsContainer.append(activeButtons);
  container.append(poemBoxPoemNode);
}


function removePoems(container) {
  const poemsNodeList = [...container.querySelectorAll('.poem-box__poem')];
  poemsNodeList.forEach((poem) => {
    poem.remove();
  })
}

function returnPoemResult(listOfPoems) {
  const index = Math.floor(Math.random() * listOfPoems.length);
  return listOfPoems[index];
}

function removePageFullHeight(pageNode){
  pageNode.classList.remove('page_fullheight');
}

function refreshPoemExcerpt(refreshButtonNode) {
  const poemNode = refreshButtonNode.closest('.poem-box__poem');
  findingArray = [poemNode.dataset.phrase];
  getPoem(findingArray);
}

formNode.addEventListener('submit', (evt) => {
  evt.preventDefault();
  removePoems(poemsContainer);
  //Добавляем поисковое значение в пустой массив
  findingArray = [];
  poemElements = [];
  findingArray.push(inputNode.value);
  //Удаляем знаки припинания и прочие символы кроме букв
  //Ищем полное вхождение
  getPoem(findingArray);
  removePageFullHeight(pageNode);
});

poemsContainer.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('poem-box__poem')) {
    const poemParagraphList = evt.target.querySelectorAll('.poem-box__paragraph_notaccent');
    poemParagraphList.forEach((elem) => {
      elem.classList.toggle('hidden');
    })
  } else if(evt.target.classList.contains('poem-box__refresh-but')) {
    refreshPoemExcerpt(evt.target);
  }
})
