// QUERY SELECTION
const dateC = document.querySelector("#date");
const timeC = document.querySelector("#time");

const dateTime = document.querySelector("#dateTime");
const greetingContainer = document.querySelector("#greetingContainer");

const greeting = document.querySelector("#greeting");
const nameInput = document.querySelector("#nameInput");
const proceedBtn = document.querySelector("#proceed");

const mainFocus = document.querySelector("#mainFocus");
const addMainFocusBtn = document.querySelector("#addMainFocus");
const mainFocusInput = document.querySelector("#mainFocusInput");
const setMainFocusBtn = document.querySelector("#setMainFocus");

const gridContainer = document.querySelector("#gridContainer");

const coverContent = document.querySelector("#cover");
const outputContent = document.querySelector("#output");
const inputContent = document.querySelector("#input");

// VARIABLES
const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];





// FUNCTIONS
const toggleHiddenMain = (element) => {
    element.classList.toggle("hidden");
}

const toggleClass = (element, cssClass) => {
    element.classList.toggle(cssClass);
}

// Gets Current Date and Time
const getDateTime = () => {
    let today = new Date();

    let day = dayList[today.getDay()];
    let month = monthList[today.getMonth()];
    let date = today.getDate();
    let year = today.getFullYear();

    dateC.textContent = `${day} , ${month} ${date}, ${year}`;

    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    timeC.textContent = `${formatHour(hour)} : ${formatMinSec(min)} : ${formatMinSec(sec)} ${checkAmPm(hour)}`;

    setTimeout(getDateTime, 1000);
}

const formatHour = (hour) => {
    if (hour === 0) { hour = 12; }
    if (hour >= 13) { hour -= 12; }
    return hour;
}

const formatMinSec = (num) => {
    if (num < 10) { num = `0${num}`; }
    return num;
}

const checkAmPm = (hour) => {
    if (hour < 12) { return "AM"; }
    else { return "PM" };
}

const createMainFocus = (parent) => {
    const list = document.createElement("li");
    list.style.listStyle = "none";
    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("inline-block");
    const checkbox = document.createElement("input");
    checkbox.name = "checkbox";
    checkbox.setAttribute("type", "checkbox");
    checkboxContainer.append(checkbox);
    const textContainer = document.createElement("div");
    textContainer.classList.add("inline-block");
    textContainer.textContent = localStorage.getItem("mainFocus");
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
    list.append(checkboxContainer, textContainer, featuresContainer);
    parent.append(list);
}

const remove = (event) => {
    event.target.parentElement.parentElement.remove();
    localStorage.removeItem("mainFocus");
}

const edit = (event) => {
    event.target.classList.toggle("hidden");
    event.target.nextElementSibling.classList.toggle("hidden");
    event.target.parentElement.parentElement.children[0].children[0].disabled = true;
    event.target.parentElement.children[0].disabled = true;
    event.target.parentElement.previousElementSibling.contentEditable = true;
}

const save = (event) => {
    if (event.target.parentElement.previousElementSibling.textContent !== "") {
        event.target.classList.toggle("hidden");
        event.target.previousElementSibling.classList.toggle("hidden");
        event.target.parentElement.parentElement.children[0].children[0].disabled = false;
        event.target.parentElement.children[0].disabled = false;
        event.target.parentElement.previousElementSibling.contentEditable = false;
    }
}

const toggle = (event) => {
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

const complete = (event) => {
    remove(event);
}





// INITIALIZATION
if (localStorage.getItem("name") === null) {
    // EVENTS

    proceedBtn.addEventListener("click", function () {
        if (nameInput.value !== "") {
            // CSS
            toggleClass(nameInput, "fadeOut");
            toggleClass(proceedBtn, "fadeOut");
            toggleClass(greeting, "fadeOut"); //present

            setTimeout(function () {
                toggleHiddenMain(nameInput);
                toggleHiddenMain(proceedBtn);
                greeting.textContent = `Pleasure to meet you, ${nameInput.value}.`;
                localStorage.setItem("name", nameInput.value);
                toggleClass(greeting, "fadeIn"); //present
            }, 1000);

            setTimeout(function () {
                toggleClass(dateTime, "fadeOut");
                toggleClass(greetingContainer, "fadeOut");
                toggleClass(coverContent, "coverShrink");
            }, 2000);

            setTimeout(function () {
                toggleClass(outputContent, "fadeOut");
                toggleClass(inputContent, "fadeOut");
                toggleClass(mainFocus, "fadeOut");
                toggleHiddenMain(outputContent);
                toggleHiddenMain(inputContent);
                toggleHiddenMain(mainFocus);
            }, 3000);

            setTimeout(function () {
                gridContainer.classList.add("mainLayout");
                outputContent.classList.add("outputLayout");
                inputContent.classList.add("inputLayout");
                toggleClass(outputContent, "fadeIn");
                toggleClass(inputContent, "fadeIn");
                toggleClass(mainFocus, "fadeIn");
                greeting.textContent = `Hi, ${localStorage.getItem("name")}. What's the plan for today?`;
                toggleClass(dateTime, "fadeIn");
                toggleClass(greetingContainer, "fadeIn");
                toggleClass(coverContent, "coverShrink");
            }, 4000);
        }
    });

}
else {

    // CSS
    gridContainer.classList.add("mainLayout");
    outputContent.classList.add("outputLayout");
    inputContent.classList.add("inputLayout");
    // Changes greeting
    greeting.textContent = `Welcome back, ${localStorage.getItem("name")}. Time to work!`;
    toggleHiddenMain(nameInput);
    toggleHiddenMain(proceedBtn);
    toggleHiddenMain(mainFocus);
    toggleHiddenMain(outputContent);
    toggleHiddenMain(inputContent);
}





// EVENTS
if (localStorage.getItem("mainFocus") === null) {
    addMainFocusBtn.addEventListener("click", function () {
        toggleHiddenMain(addMainFocusBtn);
        toggleHiddenMain(mainFocusInput);
        toggleHiddenMain(setMainFocusBtn);
    });
}
else {
    addMainFocusBtn.addEventListener("click", function () {
        toggleHiddenMain(addMainFocusBtn);
        toggleHiddenMain(mainFocusInput);
        toggleHiddenMain(setMainFocusBtn);
    });
    toggleHiddenMain(addMainFocusBtn);
    createMainFocus(mainFocus);
}


setMainFocusBtn.addEventListener("click", function () {
    if (mainFocusInput.value !== "") {
        localStorage.setItem("mainFocus", mainFocusInput.value);
        toggleHiddenMain(mainFocusInput);
        toggleHiddenMain(setMainFocusBtn);
        createMainFocus(mainFocus);
        mainFocusInput.value = "";
    }
});


mainFocus.addEventListener("click", function (event) {
    if (event.target.name === "remove") {
        remove(event);
        toggleHiddenMain(addMainFocusBtn);
    }

    if (event.target.name === "edit") {
        edit(event);
    }

    if (event.target.name === "save") {
        save(event);
        let value = event.target.parentElement.previousElementSibling.textContent;
        localStorage.setItem("mainFocus", value);
    }

    if (event.target.name === "checkbox") {
        toggle(event);
    }

    if (event.target.name === "complete") {
        complete(event);
        toggleHiddenMain(addMainFocusBtn);
    }
});

















































































