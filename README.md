# ToDoList
A Chrome Extension To-Do list
Alec Nelson
Incoperates Javascript in order to create a To Do List.
The Extension works by saving an array of strings as a string in a cookie.
The cookie is then retrieved if it contains an array it retrieves the string from the cookies uses a JSON parse memthod to recreate the array.	 
With the new array the javascript generates the html elements and attaches event listeners dynamically to the list items.   
This process occurs whenever a new item is added to the  list, modified, or removed.
