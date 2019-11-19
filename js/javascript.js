// Simarpreet Singh (200413865)

// query selector to access values and set values for different elements.
var addBtn = document.querySelector('#add');
var toDoList = document.querySelector('ul#list');
var completedList = document.querySelector('ul#completed');

// Create a new speechSynthesis object
var synth = window.speechSynthesis;
var sound = "ding ding ding ding";

function speakNow(string) {
	var utterThis = new SpeechSynthesisUtterance(string);
	// Actually speak the text and here we have set the sound.
	synth.speak(utterThis);
}


// add new item in todo list
addBtn.onclick = function(){

  //input element from HTML page
  var input = document.querySelector('#input');


  // create new list element for adding new item
  var li = document.createElement('li');
  li.setAttribute('class', 'list-group-item');

  // get inserted value of todo list item from input tag
  var itemValue = input.value;
  console.log(itemValue);

  // set item value to new list element of HTML page.
  li.innerHTML = itemValue;

  // create new checkBox element in the same list element
  var checkBox = document.createElement('input');

  checkBox.setAttribute('type', 'checkbox');
  checkBox.setAttribute('id', 'myCheck');
  checkBox.setAttribute('style', 'float: left;margin-right: 7px;');

  // append new child for that list element.
  li.appendChild(checkBox);

  // function for checking out the checkbox.
  checkBox.onchange = function(){
    // speak ding sound when checkbox is checked.
    speakNow(sound);
    var completedLi = document.createElement('li');
    li.removeChild(checkBox);
    // create class attribute for bootstrap class
    completedLi.setAttribute('class', 'list-group-item');

    // take text value and convert it into string
    var itemStringValue = li.innerText.toString();
    var completedItemValue = li.innerText.toString().substr(0, itemStringValue.length - 6);
    completedLi.innerText = completedItemValue;
    // create a delete button so the user can also delete unwanted completed item from list.
    var deleteButtonCompleted = document.createElement('button');
    deleteButtonCompleted.innerText = "Delete";
    deleteButtonCompleted.setAttribute('id', 'deleteCompleted');
    deleteButtonCompleted.setAttribute('style', 'float: left;');
    completedLi.appendChild(deleteButtonCompleted);
    // event listener for completed item's delete button
    deleteButtonCompleted.onclick = function(){
      console.log("Completed item deleted!");
      completedList.removeChild(completedLi);
    }

    // add css to completed list item
    completedLi.setAttribute('style','background-color: rgb(102, 255, 102);margin-bottom: 15px;text-Decoration: line-through;');

    // append new child to completedList.
    completedList.appendChild(completedLi);
    // remove item from todo list by setting display property to none.
    //remove child from todo list
    toDoList.removeChild(li);
  }

  // delete button for todo list item
  var deleteButton = document.createElement('button');
  deleteButton.innerHTML = "Delete";
  deleteButton.setAttribute('id', 'delete');
  deleteButton.setAttribute('style', 'float: right;');
  li.appendChild(deleteButton);

  // event handler for delete button of todo list item
  deleteButton.onclick = function(){
    console.log("Deleted");
    li.style.display = 'none';
  }
  if(itemValue === ''){
    // shows alert message on the browser screen.
    alert("To add something to your ToDo list, you have to add something to text field.");
  }

  // if there is something into text field, then add new item into todo list.
  else{
    toDoList.appendChild(li);
  }
  // after adding item into todo list, remove text from the input field.
  input.value = "";
}
