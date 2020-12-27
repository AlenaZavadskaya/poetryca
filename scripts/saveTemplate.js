
const poemBoxNode = document.querySelector('.poem-box');
const generateForm = document.forms["generate"];

    
function saveTemplate(e) {
    e.preventDefault();
    const data = getPoemsText()
    fetch("https://script.google.com/macros/s/AKfycbySR1Xr-2Rx7LgI3-FiFBWYitKj-IaC7-WZ8qA8GFsM-jvqckz4/exec",
        { method: "POST", body: data })
        .then((response) => {return response.json()})
        .then((data) => {console.log(data)})
        .catch((error) => console.error("Error!", error.message));
};  


function getPoemsText() {
    const userId = getCookie('userId');
    const poemList = [...poemBoxNode.querySelectorAll('.poem-box__poem')];
    const searchData = document.querySelector('.content__form-input').value;
    const text = poemList.reduce((result, elem) => {
        const paragList = [...elem.querySelectorAll('.poem-box__paragraph')];

        let text =  paragList.reduce((text, elem) => {
            let resp = text + '\n' + elem.textContent
            //console.log(resp)
            return resp;
        }, '')
        
        return result + '\n' +  text;

    }, '')

    return JSON.stringify({'userId': userId, 'searchData': searchData, 'text': text});
    

}