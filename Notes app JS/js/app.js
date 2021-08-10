console.log('hello');
showNotes(); //to get all notes even after refreshing

/**
Different steps- 
1- if user adds a note, add to the local storage
2- function to display the notes
3- function to delete the note
4- search function
 */


//if user adds a note, add to the local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle= document.getElementById('addTitle')
    let notes = localStorage.getItem('notes'); //notes that are already present in the local storage
    if (notes === '') {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes); //string to array
    }
    let myObj={   //for the title part
        title:addTitle.value,
        text:addTxt.value
    }
    notesObj.push(myObj);//add the notes that are added
    localStorage.setItem('notes', JSON.stringify(notesObj));//to update the local storage, stringify cuz values are stored in string
    addTxt.value = "";//to empty the notes that are added below
    addTitle.value = ""; // to empty the title
    showNotes();
})

//function to display the notes
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes); //string to array
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="card my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title"> ${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id=${index} onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<p><strong>Nothing to show! Use "Add a note" section to add notes</strong></p>`
    }
}

//function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes); //string to array
    }
    notesObj.splice(index,1);//removes JS array elements and adds the existing elements back in place
    localStorage.setItem('notes', JSON.stringify(notesObj));//to update the local storage
    showNotes();

}

//search function
let search=document.getElementById("searchTxt");
search.addEventListener("input",function(){
    let input=search.value.toLowerCase();
    console.log("input fired", input);
    let notesCard=document.getElementsByClassName("cards");
    Array.from(notesCard).forEach(function(element){
        let cardTxt=element.getElementByTagName("p")[0].innerText;
        if(cardTxt.includes(input)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }

    })
})