const title = document.getElementById("title");
const priority = document.getElementById("priority");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editedTaskIndex = null;

const iconPencil = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#E53888" class="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/></svg>'
const iconRubbish = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#E53888" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>'

function addNew(event){
    event.preventDefault(); 

    if (editedTaskIndex !== null) {
        tasks[editedTaskIndex] = {
            title: title.value,
            priority: priority.value
        };
        editedTaskIndex = null;

        const button = document.getElementById("btn");
        button.innerText = "Add new +";
    } else {
        const newTask = {
            title: title.value,
            priority: priority.value  
        };

        tasks.push(newTask);
    }

    saveData();
    renderTasks();

    title.value = "";
    priority.value = "";
}

function saveData(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){
    taskList.innerHTML = ""
    
    tasks.forEach((task, index) => {
        const divCard = document.createElement("div");
        divCard.classList.add("card");
        divCard.setAttribute("data-index", index);
        
        const divContent = document.createElement("div");
        divContent.classList.add("content");
        
        const divCardPriority = document.createElement("div");
        divCardPriority.classList.add("card-priority");
        
        const divButtons = document.createElement("div");
        divButtons.classList.add("buttons")
        
        const linkBtn1 = document.createElement("a");
        linkBtn1.classList.add("btn", "edit");
        linkBtn1.innerHTML = iconPencil;
        
        const linkBtn2 = document.createElement("a");
        linkBtn2.classList.add("btn", "delete");
        linkBtn2.innerHTML = iconRubbish;
        
        const taskTitle = document.createElement("p");
        taskTitle.classList.add("card-title");
        taskTitle.innerText = task.title;
        
        const taskPriority = document.createElement("p");
        taskPriority.classList.add("priority");
        taskPriority.innerText = task.priority;
        
        divButtons.appendChild(linkBtn1);
        divButtons.appendChild(linkBtn2);
        
        divCardPriority.appendChild(taskPriority);
        
        divContent.appendChild(taskTitle);
        divContent.appendChild(divCardPriority);
        
        divCard.appendChild(divContent);
        divCard.appendChild(divButtons);
        
        taskList.appendChild(divCard);
        
        saveData()
    });
}

taskList.addEventListener("click", function(event){
    if (event.target.closest(".delete")){
        const card = event.target.closest(".card");
        const index = card.getAttribute("data-index");

        tasks.splice(index, 1);
        saveData();
        renderTasks();
    } else if (event.target.closest(".edit")) {
        const card = event.target.closest(".card");
        const index = card.getAttribute("data-index");
    
        const task = tasks[index];
    
        const button = document.getElementById("btn");
        button.innerText = "Save task";
    
        title.value = task.title;
        priority.value = task.priority;
    
        editedTaskIndex = index;
    }
    
})

renderTasks();