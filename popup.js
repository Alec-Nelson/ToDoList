// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function clickHandler(e){
  setTimeout(addText, 1);
}
function clickClearHandler(e){
  setTimeout(clearList, 1);
}
var count = 0;

//global string for cookie list will be stored in
var listCookie = 'ListItemsCookie';
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
  setCookie("listItems", json_str);

}

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

function clearList()
{
  var element = document.getElementById("list");
  element.innerHTML = "";
  setCookie("listItems", "[]");
}

function moveItem(ind){
  var json_str = getCookie(listCookie);
  var array = JSON.parse(json_str);
  alert("moving item "+ ind.innerHTML );

}

function setCookie(cname, cvalue) {
    var d = new Date();
    document.cookie = cname + "=" + cvalue + ";";
}


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





// function getCurrentTabUrl(callback) {
//   // Query filter to be passed to chrome.tabs.query - see
//   // https://developer.chrome.com/extensions/tabs#method-query
//   var queryInfo = {
//     active: true,
//     currentWindow: true
//   };
//   chrome.tabs.query(queryInfo, function(tabs) {
//     var tab = tabs[0];
//     var url = tab.url;
//     console.assert(typeof url == 'string', 'tab.url should be a string');
//     callback(url);
//   });
// }
// function renderStatus(statusText) {
//   document.getElementById('status').textContent = statusText;
// }
// retrieveList();
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
