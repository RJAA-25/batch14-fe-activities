// QUERY SELECTION
const totalTasks = document.querySelector("#totalTasks");

const createTask = document.querySelector("#createTask");
const taskDetails = document.querySelector("#taskDetails");
const classifyTask = document.querySelector("#classifyTask");

const addTaskBtn = document.querySelector("#addTask");
const taskUrgentBtn = document.querySelector("#taskUrgent");
const taskRegularBtn = document.querySelector("#taskRegular");

const urgentList = document.querySelector("#urgent");
const regularList = document.querySelector("#regular");
const completedList = document.querySelector("#completed");

// LIST COUNTERS
let totalListCounter = 0;
let urgentListCounter = 0;
let regularListCounter = 0;
let completedListCounter = 0;

// LOCAL STORAGE - ARRAYS
const urgentStore = [];
const regularStore = [];
const completedStore = [];

// STRINGS FOR LOCAL STORAGE
const totalLC = "totalListCounter";
const urgentLC = "urgentListCounter";
const regularLC = "regularListCounter";
const completedLC = "completedListCounter";

const urgentL = "urgentList";
const regularL = "regularList";
const completedL = "completedList";





// FUNCTIONS
const globalInc = () => {
    totalListCounter += 1;
    localStorage.setItem(totalLC, JSON.stringify(totalListCounter));
}

const globalDec = () => {
    totalListCounter -= 1;
    localStorage.setItem(totalLC, JSON.stringify(totalListCounter));
}

const createList = (value, parent) => {
    const list = document.createElement("li");
    list.style.listStyle = "none";
    createCheckbox(list);
    createText(value, list);
    createFeatures(list);
    parent.append(list);
}

const createCompletedList = (value, parent) => {
    const list = document.createElement("li");
    list.style.listStyle = "none";
    list.textContent = value;
    parent.append(list);
}

const createText = (value, parent) => {
    const textContainer = document.createElement("div");
    textContainer.classList.add("inline-block");
    textContainer.textContent = value;
    parent.append(textContainer);
}

const createCheckbox = (parent) => {
    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("inline-block");
    const checkbox = document.createElement("input");
    checkbox.name = "checkbox";
    checkbox.setAttribute("type", "checkbox");
    checkboxContainer.append(checkbox);
    parent.append(checkboxContainer);
}

const createFeatures = (parent) => {
    const featuresContainer = document.createElement("div");
    featuresContainer.classList.add("inline-block");
    // Remove   
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
    removeBtn.name = "remove";
    // Edit
    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.name = "edit"
    // Save
    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = '<i class="fas fa-save"></i>';
    saveBtn.name = "save";
    saveBtn.classList.toggle("hidden");
    // Complete
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fas fa-forward"></i>';
    completeBtn.name = "complete";
    completeBtn.disabled = true;
    featuresContainer.append(removeBtn, editBtn, saveBtn, completeBtn);
    parent.append(featuresContainer);
}

const removeList = (event, store, localStr) => {
    // Removes the list element
    event.target.parentElement.parentElement.remove();
    // Removes the string from the array
    let value = event.target.parentElement.parentElement.children[1].textContent;
    let index = store.indexOf(value);
    store.splice(index, 1);
    // Updates the new array in the local storage
    localStorage.setItem(localStr, JSON.stringify(store));
}

const editText = (event) => {
    event.target.classList.toggle("hidden");
    event.target.nextElementSibling.classList.toggle("hidden");
    event.target.parentElement.parentElement.children[0].children[0].disabled = true;
    event.target.parentElement.children[0].disabled = true;
    event.target.parentElement.previousElementSibling.contentEditable = true;
}

const saveText = (event) => {
    if (event.target.parentElement.previousElementSibling.textContent !== "") {
        event.target.classList.toggle("hidden");
        event.target.previousElementSibling.classList.toggle("hidden");
        event.target.parentElement.parentElement.children[0].children[0].disabled = false;
        event.target.parentElement.children[0].disabled = false;
        event.target.parentElement.previousElementSibling.contentEditable = false;
    }
}

const toggleCheck = (event) => {
    // Status: checked
    if (event.target.checked === true) {
        event.target.parentElement.nextElementSibling.classList.toggle("line-through");
        event.target.parentElement.parentElement.children[2].children[0].disabled = true;
        event.target.parentElement.parentElement.children[2].children[1].disabled = true;
        event.target.parentElement.parentElement.children[2].children[3].disabled = false;
    }
    // Status: unchecked
    else {
        event.target.parentElement.nextElementSibling.classList.toggle("line-through");
        event.target.parentElement.parentElement.children[2].children[0].disabled = false;
        event.target.parentElement.parentElement.children[2].children[1].disabled = false;
        event.target.parentElement.parentElement.children[2].children[3].disabled = true;
    }
}

const completeTask = (event) => {
    const list = document.createElement("li");
    list.style.listStyle = "none";
    list.textContent = value;
    // list.textContent = event.target.parentElement.previousElementSibling.textContent;
    completedList.prepend(list);
    // Updates completed tasks in local storage
    completedListCounter += 1;
    localStorage.setItem(completedLC, JSON.stringify(completedListCounter));
    completedStore.unshift(value);
    localStorage.setItem(completedL, JSON.stringify(completedStore));
    // Updated Completion
    totalTasks.textContent = `${completedListCounter} / ${totalListCounter} Tasks Completed`;
    // Removes task from the list
    event.target.parentElement.parentElement.remove();
}





// INITIALIZATION
// totalListCounter
if (JSON.parse(localStorage.getItem(totalLC)) === null) { localStorage.setItem(totalLC, JSON.stringify(totalListCounter)); }
else { totalListCounter = JSON.parse(localStorage.getItem(totalLC)); }

// urgentListCounter
if (JSON.parse(localStorage.getItem(urgentLC)) === null) { localStorage.setItem(urgentLC, JSON.stringify(urgentListCounter)); }
else { urgentListCounter = JSON.parse(localStorage.getItem(urgentLC)); }

// urgentStore
if (JSON.parse(localStorage.getItem(urgentL)) === null) { localStorage.setItem(urgentL, JSON.stringify(urgentStore)); }
else {
    for (let i = 0; i < urgentListCounter; i++) { urgentStore.push(JSON.parse(localStorage.getItem(urgentL))[i]); }
}

// regularListCounter
if (JSON.parse(localStorage.getItem(regularLC)) === null) { localStorage.setItem(regularLC, JSON.stringify(regularListCounter)); }
else { regularListCounter = JSON.parse(localStorage.getItem(regularLC)); }

// regularStore
if (JSON.parse(localStorage.getItem(regularL)) === null) { localStorage.setItem(regularL, JSON.stringify(regularStore)); }
else {
    for (let i = 0; i < regularListCounter; i++) { regularStore.push(JSON.parse(localStorage.getItem(regularL))[i]); }
}

// completedListCounter
if (JSON.parse(localStorage.getItem(completedLC)) === null) { localStorage.setItem(completedLC, JSON.stringify(completedListCounter)); }
else { completedListCounter = JSON.parse(localStorage.getItem(completedLC)); }

// completedStore
if (JSON.parse(localStorage.getItem(completedL)) === null) { localStorage.setItem(completedL, JSON.stringify(completedStore)); }
else {
    for (let i = 0; i < completedListCounter; i++) { completedStore.push(JSON.parse(localStorage.getItem(completedL))[i]); }
}

if (totalListCounter !== 0 || completedListCounter !== 0) {
    totalTasks.textContent = `${completedListCounter} / ${totalListCounter} Tasks Completed`;
}



// CREATE STORED TASKS - URGENT, REGULAR, COMPLETED
// Stored Urgent Tasks
for (let i = 0; i < urgentListCounter; i++) {
    createList(urgentStore[i], urgentList);
}

// Stored Regular Tasks
for (let i = 0; i < regularListCounter; i++) {
    createList(regularStore[i], regularList);
}

// Stored Completed Tasks
for (let i = 0; i < completedListCounter; i++) {
    createCompletedList(completedStore[i], completedList);
}

// CSS
createTask.classList.toggle("taskFlex");

// EVENTS
// CREATE TASKS - URGENT, REGULAR0
// Classifies the priority status of task
addTaskBtn.addEventListener("click", function () {
    if (taskDetails.value !== "") {
        createTask.classList.toggle("taskFlex");
        createTask.classList.toggle("hidden");
        classifyTask.classList.toggle("hidden");
        classifyTask.classList.toggle("taskFlex");
    }
});

// Creates Urgent Tasks
taskUrgentBtn.addEventListener("click", function () {
    // Updates global and local counter
    globalInc();
    urgentListCounter += 1;
    localStorage.setItem(urgentLC, JSON.stringify(urgentListCounter));
    // Stores array data to local storage
    urgentStore.push(taskDetails.value);
    localStorage.setItem(urgentL, JSON.stringify(urgentStore));
    // Creates and appends list
    createList(taskDetails.value, urgentList);

    totalTasks.textContent = `${completedListCounter} / ${totalListCounter} Tasks Completed`;

    // Resets Task Input
    taskDetails.value = "";
    createTask.classList.toggle("hidden");
    createTask.classList.toggle("taskFlex");
    classifyTask.classList.toggle("taskFlex");
    classifyTask.classList.toggle("hidden");
});

// Creates Regular Tasks
taskRegularBtn.addEventListener("click", function () {
    // Updates global and local counter
    globalInc();
    regularListCounter += 1;
    localStorage.setItem(regularLC, JSON.stringify(regularListCounter));
    // Stores array data to local storage
    regularStore.push(taskDetails.value);
    localStorage.setItem(regularL, JSON.stringify(regularStore));
    // Creates and appends list
    createList(taskDetails.value, regularList);

    totalTasks.textContent = `${completedListCounter} / ${totalListCounter} Tasks Completed`;

    // Resets Task Input
    taskDetails.value = "";
    createTask.classList.toggle("hidden");
    createTask.classList.toggle("taskFlex");
    classifyTask.classList.toggle("taskFlex");
    classifyTask.classList.toggle("hidden");
});





// FUNCTIONALITY - CHECK, REMOVE, EDIT, SAVE, COMPLETE
// Stores data for Functionality features
let value = "";
let index = 0;

// Sets functionality for urgent tasks
urgentList.addEventListener("click", function (event) {
    if (event.target.name === "remove") {
        removeList(event, urgentStore, urgentL);
        globalDec();
        urgentListCounter -= 1;
        localStorage.setItem(urgentLC, JSON.stringify(urgentListCounter));

        if (completedListCounter === 0 && totalListCounter === 0) {
            totalTasks.textContent = "No Tasks Available";
        } else {
            totalTasks.textContent = `${completedListCounter} / ${totalListCounter} Tasks Completed`;
        }
    }
    if (event.target.name === "edit") {
        value = event.target.parentElement.previousElementSibling.textContent;
        index = urgentStore.indexOf(value);
        editText(event);
    }
    if (event.target.name === "save") {
        saveText(event);
        value = event.target.parentElement.previousElementSibling.textContent;
        urgentStore.splice(index, 1, value);
        localStorage.setItem(urgentL, JSON.stringify(urgentStore));
    }
    if (event.target.name === "checkbox") {
        toggleCheck(event);
    }
    if (event.target.name === "complete") {
        value = event.target.parentElement.previousElementSibling.textContent;
        index = urgentStore.indexOf(value);
        urgentStore.splice(index, 1);
        urgentListCounter -= 1;
        localStorage.setItem(urgentLC, JSON.stringify(urgentListCounter));
        localStorage.setItem(urgentL, JSON.stringify(urgentStore));
        completeTask(event);
    }
});

// Sets functionality for regular tasks
regularList.addEventListener("click", function (event) {
    if (event.target.name === "remove") {
        removeList(event, regularStore, regularL);
        globalDec();
        regularListCounter -= 1;
        localStorage.setItem(regularLC, JSON.stringify(regularListCounter));

        if (completedListCounter === 0 && totalListCounter === 0) {
            totalTasks.textContent = "No Tasks Available";
        } else {
            totalTasks.textContent = `${completedListCounter} / ${totalListCounter} Tasks Completed`;
        }
    }
    if (event.target.name === "edit") {
        value = event.target.parentElement.previousElementSibling.textContent;
        index = regularStore.indexOf(value);
        editText(event);
    }
    if (event.target.name === "save") {
        saveText(event);
        value = event.target.parentElement.previousElementSibling.textContent;
        regularStore.splice(index, 1, value);
        localStorage.setItem(regularL, JSON.stringify(regularStore));
    }
    if (event.target.name === "checkbox") {
        toggleCheck(event);
    }
    if (event.target.name === "complete") {
        value = event.target.parentElement.previousElementSibling.textContent;
        index = regularStore.indexOf(value);
        regularStore.splice(index, 1);
        regularListCounter -= 1;
        localStorage.setItem(regularLC, JSON.stringify(regularListCounter));
        localStorage.setItem(regularL, JSON.stringify(regularStore));
        completeTask(event);
    }
});