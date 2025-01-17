//Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const addBtn = document.querySelector('.btn');

//Event listeners
//Load task data from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

//Add tasks to the list
addBtn.addEventListener('click', addTask);

//delete tasks individually
taskList.addEventListener('click', deleteTask);

//Clear all the tasks in the list
clearBtn.addEventListener('click', clearTasks);

//Filter through the tasks
filter.addEventListener('keyup', filterList);

                                //FUNCTIONS 
function loadTasks(){
  let tasks; 
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){

     //create new task from input given 
     const li = document.createElement('li');
     //Create a class for it
     li.className = 'collection-item';
     //Sets the value inputed
     li.textContent = task;
     //append it to the DOM
     taskList.appendChild(li); 
 
     //add the delete icon link
     const deleteIcon = document.createElement('a');
     //give it a class name
     deleteIcon.className = 'delete-item secondary-content';
     
     //include the font awesome delete icon
     deleteIcon.innerHTML = '<i class="fa fa-remove"></i>';
 
     //append it to the DOM list
     li.appendChild(deleteIcon);

  })
}                               
                          
//Function to add the task being input
function addTask(e){
  e.preventDefault(); 

  if(taskInput.value === ''){
    alert('No input given!');
  }else{
    // alert(`${taskInput.value} added successfully!`);
    //code for adding the task into the ui and appending

    //create new task from input given 
    const li = document.createElement('li');
    //Create a class for it
    li.className = 'collection-item';
    //Sets the value inputed
    li.textContent = `${taskInput.value}`;
    //append it to the DOM
    taskList.appendChild(li); 

    //add the delete icon link
    const deleteIcon = document.createElement('a');
    //give it a class name
    deleteIcon.className = 'delete-item secondary-content';
    
    //include the font awesome delete icon
    deleteIcon.innerHTML = '<i class="fa fa-remove"></i>';

    //append it to the DOM list
    li.appendChild(deleteIcon); 

    //store data to local storage
    saveToStorage(taskInput.value);

    //Clear input after user enters
    taskInput.value = '';

  }
  
}

//save item to local storage
function saveToStorage(task){
  let tasks; 
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeFromStorage(delItem){
  
  let tasks; 
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(task === delItem.textContent){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

function clearLocalStorage(){
  localStorage.clear();
}

//Function to delete the task selected
function deleteTask(e){

  if(e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.remove();

    removeFromStorage(e.target.parentElement.parentElement);
  }

  e.preventDefault();
}


//Function to clear all the tasks
function clearTasks(e){
  e.preventDefault();
  // taskList.innerHTML = '';

  while(taskList.firstChild){           //faster than innerHTML = '';
    taskList.removeChild(taskList.firstChild);
  }

  clearLocalStorage();
}


//Function to filter through the list
function filterList(e){
  e.preventDefault();

  const typedText = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(eTask){
    const passedTask = eTask.textContent; 
    if(passedTask.toLowerCase().indexOf(typedText) != -1){
      eTask.style.display = 'block';
    }else{
      eTask.style.display = 'none';
    }
  })
}


