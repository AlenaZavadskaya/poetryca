const formNode = document.forms.poemForm;
const inputNode = formNode.elements.words;
const poemsContainer = document.querySelector('.poems-container');
//Тут храним последние слова из ненайденной фразы
let findingArray = [];



//Рекурсивная функция
function getPoem(keyPhrase) {

  //Базовый случай 
  if(keyPhrase.length === 0) {
    //тут прерываем выполнение программы
    console.log('выполнение прервано - список посиска пуст');
    return;
  } 
  //Рекурсивный случай
  //Массив хранения элементов одной поэмы
  //Тут хранить массив строк (p) одной поэмы
  
  fetch(`http://buymebuyme.xyz?q=${keyPhrase[0]}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((listOfPoems) => {
      let poemElements = [];
      //Если есть результат
      console.log(`Начали поиск по: ${findingArray} `);
      if(listOfPoems.length > 0) {      
        //Переменная хранения результата
        let resultPoemObject = returnPoemResult(listOfPoems);
        //Вот результат:
        console.log(resultPoemObject);
        //Вхождение точно есть
        //Разбиваем неразмеченный текст на фразы
        //И добавляем в массив объектов для формирования Одной поэмы
        //Добавляем в результат для вывода
        // И ищем остальные слова в найденном тексте
        let poemText = resultPoemObject.fields.text;
        let poemTextList = poemText.split('\n');
        //Очищаем текст от аннотаций
        
        let [clearPoemTextList, annots] = clearPoemAnnots(poemTextList);
        console.log(clearPoemTextList);
        let poemElements = addPoemParts(clearPoemTextList, annots);
        //Удаляем последний пустой элемент
        poemElements.pop();

        //Показываем стихотворение
        console.log('Начинаем отрисовку');
        console.log(poemElements);
        renderPoem(poemElements, poemsContainer);
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
          console.log('не нашли полное вхождение');
          let firstWords = firstWordsList.join(' ');
          findingArray.splice(0, 1, firstWords, lastWord);
          
          //Рекурсивно ищем то что получили
          getPoem(findingArray);

          
        } else {
          //В этом блоке мы не нашли входение
          //И слов у нас 1 или нет
          //Возвращаем блок отрывка с текстом ошибки "не найдено!"

          const noFindMessageNode = document.createElement('p');
          
          noFindMessageNode.classList.add('poem__paragraph', 'poem__paragraph_error');
          
          noFindMessageNode.textContent = 'Извините, мы не нашли такое слово...';
          let noFindMessageNodeList = []
          noFindMessageNodeList.push(noFindMessageNode); 
          console.log(noFindMessageNode);
          console.log(noFindMessageNodeList);
          renderPoem(noFindMessageNodeList, poemsContainer);

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
    //console.log('несколько вариантов вхождения');
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
  console.log(stringElementArray.length);
  console.log(findingArray);
  if(stringElementArray.length === 0) {
    return '';
  }
  //Разделяем текст на массив по строчкам
  //И возвращаем массив элементров поэмы
  let poemParagraphNode = document.createElement('p');
  poemParagraphNode.classList.add('poem__paragraph');
  //Ищем вхождение
  if(stringElementArray[0].includes(findingArray[0])) {
    console.log('нашли');
    //Разделяем текст на ["до", 'вхождение', 'после']
    const beforeAfterArray = stringElementArray[0].split(findingArray[0]);
     //Сохдаем span для выделения входжения
    const poemSpanAccentNode = document.createElement('span');
    poemSpanAccentNode.classList.add('poem__accent');
    poemSpanAccentNode.textContent = findingArray[0];
    console.log('HERE!!!');
    let [afterText, annot=''] = addAnnots(beforeAfterArray[1], annots);
    console.log(afterText);
    //Добавляем в результат элементов поэмы тест "до" и span с вхождением
    poemParagraphNode.append(beforeAfterArray[0], poemSpanAccentNode, afterText, annot);
    //Удаляем первое значение из поискового массива
    findingArray.shift();
  } 
  else {
    console.log('не нашли');
    //Не нашли входение в итераци добаляем просто текст
    //poemParagraphNode.textContent = stringElementArray[0]; 

    let [afterText, annot=''] = addAnnots(stringElementArray[0], annots);
    console.log(afterText);
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
        console.log('HJKHFKJHGJDHFGKJHJK==========' + text.slice(text.indexOf(annotNumb)));
        text = text.slice(0, text.indexOf(annotNumb));
        const span = document.createElement('span');
        span.title = annotList[1];
        span.textContent = annotNumb;
        console.log(span);
        [resText, resSpan] = [text, span];
      }   
    })
  }
  return [resText, resSpan]
};

function renderPoem(poemElements, container) {
  const poemElement = document.createElement('li');
  poemElement.classList.add('poem');
  container.append(poemElement);
  poemElements.forEach((node) => {
    poemElement.append(node);
  }) 
}


function removePoems(container) {
  
  const poemsNodeList = [...container.querySelectorAll('.poem')];

  poemsNodeList.forEach((poem) => {
    poem.remove();
  })
}


function returnPoemResult(listOfPoems) {
  const index = Math.floor(Math.random() * listOfPoems.length);
  return listOfPoems[index];
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
  /*inputNode.value.split(' ').forEach((elem) => {
    getPoem(elem);    
  })*/
});

