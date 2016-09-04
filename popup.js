
function clickHandler(e){
  setTimeout(addText, 1);
}
function clickClearHandler(e){
  setTimeout(clearList, 1);
}

// global string for cookie list will be stored in
var listCookie = "ListItemsCookie";

//Loads array of list items from cookie
//pushes new list item to array
//adds new list item to internal html
//saves array new string into same cookie
function addText()
{
  var json_str = getCookie(listCookie);
  var array = JSON.parse(json_str);
	var word = document.getElementById('inputText').value;
  document.getElementById('inputText').value = "";
  if (!Array.isArray(array))
  {
    // alert("It is creating new array");
   var array = [];
  }
  array.push(word);
  // alert("Length of array is: " + array.length);
  var element = document.getElementById("list");
  element.innerHTML = "";
  for (i = 0; i < array.length; i++)
  {
    var newItem = document.createElement("li");
    var node = document.createTextNode(array[i]);
    newItem.appendChild(node);
    element.appendChild(newItem);
  }
  var json_str = JSON.stringify(array);
  setCookie(listCookie, json_str);
}

//loads List on Extension start up
//
function retrieveList()
{
  var json_str = getCookie(listCookie);
  var array = JSON.parse(json_str);
  if (!Array.isArray(array))
  {
    alert("It is creating new array");
    var array = [];
  }
   var element = document.getElementById("list");
   var index = 0;
   var newItem;
  for (i = 0; i < array.length; i++)
  {
    var newItem = document.createElement("li");
    var node = document.createTextNode(array[i]);
    newItem.appendChild(node);
    element.appendChild(newItem);
    //closure so function executes now and local variable is passed
    //each list item has a event listener with its own node
    (function(newItem) {newItem.addEventListener("click", function()
                  {moveItem(newItem)});
                }
    )(newItem);
  }
}

//Clear's List of all entries
//saves empty array into cookie
function clearList()
{
  var element = document.getElementById("list");
  element.innerHTML = "";
  setCookie(listCookie, "[]");
}

//Moves list items into new positions relative
//to other list items
//saves them into
function moveItem(ind){
  var json_str = getCookie(listCookie);
  var array = JSON.parse(json_str);
  alert("moving item "+ ind.innerHTML );

}

//Sets Cookie String
//cname- String name of cookie
//cvalue- new String to be saved in cookie
function setCookie(cname, cvalue) {
    var d = new Date();
    document.cookie = cname + "=" + cvalue + ";";
}


//Retrieves String saved in cookie
//cname- name of cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}


//On Extension Window load, attatches all Event Listeners
//Loads Current List
//Sets Enter key as Enter button and delete key as clear
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("clearButton").addEventListener("click", clickClearHandler);
  document.querySelector('button').addEventListener('click', clickHandler);
  document.addEventListener("load", retrieveList());
 document.getElementById("inputText").addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }
    // Enter is pressed
    if (e.keyCode == 13) { clickHandler(); }
    else if(e.keyCode == 46) {clickClearHandler(); }
}, false);
});
