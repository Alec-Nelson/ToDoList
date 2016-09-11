# ToDoList
A Chrome Extension To-Do list

(In order to try out for yourself simply download project, then within chrome under drop down menu go to more tools. Then click extensions. In the extensions page check developer mode check box, then click 'load unpacked extensions' finally select the project folder downloaded and the extension should appear in the top right corner.)

Alec Nelson
Incorporates HTML, CSS, and Javascript in order to create a To Do List.
The Extension works by saving an array of strings as a JSON formatted string in a cookie.
The cookie is then retrieved if it contains an array it retrieves the string from the cookies uses a JSON parse method to recreate the array.	 
With the new array the Javascript generates the html elements and attaches event listeners dynamically to the list items.   
This process occurs whenever a new item is added to the  list, modified, or removed.

The list items can also be reorganized by dragging and dropping with the jquery-ui library.
Items can be removed from list by clicking the check box or by clicking the clear all entries button.
