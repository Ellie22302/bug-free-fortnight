const divE = document.getElementById("list");
var userTitle = document.getElementById("title");
var userText = document.getElementById("text");
var saveBtn = document.getElementById("saveNote");
var clearBtn = document.getElementById("clearNote");
var newBtn = document.getElementById("newNote");




if(clearBtn){
clearBtn.addEventListener("click", clearForm);
}

function clearForm(){
    userTitle.value = "";
    userText.value = "";
    
}


if(newBtn){
newBtn.addEventListener("click", newNote);
}
function newNote(){
  userTitle.removeAttribute('readonly');
  userText.removeAttribute('readonly');
    userTitle.value = "";
    userText.value = "";
     newBtn.style.display = "none";
}


   userTitle.addEventListener('keyup', show );
  userText.addEventListener('keyup', show );

  function show(){
    
    if (userTitle.value != ""){
        saveBtn.style.display = "inline";
        clearBtn.style.display = "inline";
    }
   
  }

const getNotes = () =>
  fetch('/notes/api', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
  .then((data) => {
     return data;
  });

  const saveNote = (newNote) =>
  fetch('/notes/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newNote),
  })
      var textobject = [];
     
    function renderNotes(note){
        var divTitle = document.createElement("div");
        var divText = document.createElement("div");
        divTitle.classList.add('title-list');
        divTitle.innerHTML = note.title;
        divText.innerHTML = note.text;
        textobject.push(note.title);
        textobject.push(note.text);
        textobject.push(note.id);
        divE.appendChild(divTitle);

        divE.addEventListener('click', viewNote);
       
            }
     function viewNote(event){
        
       userTitle.value = event.target.textContent;
        let titleIndex = textobject.findIndex(x => x == event.target.textContent);
        userText.value = textobject[titleIndex + 1];
        var noteId = textobject[titleIndex + 2];
        userTitle.setAttribute('readonly', true);
        userText.setAttribute('readonly', true);    
        
     }      
    getNotes().then((response) => response.forEach((item) => renderNotes(item)));

    if(saveBtn){
    saveBtn.addEventListener("click", postData);
    }
      function postData() {
       
        var userdata = {
          title: userTitle.value,
          text: userText.value,
        
        }
        saveNote(userdata).then(data=>data.json()).then(responseData => {
          divE.innerHTML = "";
          responseData.forEach((information) => renderNotes(information))
        }).catch((err)=> console.log(err)); 
       
      
       
      }
      const goRenderNotes = () => getNotes().then(responseData => {
        divE.innerHTML = "";
        clearForm();
        responseData.forEach((information) => renderNotes(information))
      }).catch((err)=> console.log(err)); 
      

