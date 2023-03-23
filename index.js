// JSON = Javascript )bject Notation
// Local object 'state' where we store certain things
// Inspect element karine console na badle application par jao toh key and value made je store thay eni
// It's a local storage jene apde set, get and delete kari shakiye and it has less response time

// Kindoff backup storage array
const state = {
    taskList: [],
}

// DOM Operations
const taskModal = document.querySelector(".task__modal__body");
const taskContents = document.querySelector(".task__contents");

// JS and HTML code for template for the card on screen
// id, key, ${} can be used to access JS into HTML
const htmlTaskContent = ({id, title, description, type, url}) => `
    <div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
        <div class="card shadow task__card">
            <div class="card-header d-flex justify-content-end task__card__header">
                <button type="button" class="btn btn-outline-primary mr-1.5"
                        onclick="editTask.apply(this, arguments)" name=${id}>
                    <i class="fa-solid fa-pen-fancy" name=${id}></i>
                </button>
                <button type="button" class="btn btn-outline-danger mr-1.5"
                         onclick="deleteTask.apply(this, arguments)" name=${id}>
                    <i class="fa-solid fa-trash-can" 
                        onclick="deleteTask.apply(this, arguments)" name=${id}"></i>
                </button>
            </div>
            <div class="class-body">
                ${
                    url
                    ? `<img width="100%" src=${url} alt="Card Image" class="card-img-top md-4 rounded-lg" />`
                    : `<img width="100%" src="./images/default_img.jpg" alt="Card Image" class="card-img-top md-3 rounded-lg" />`
                }
                <h4 class="card-title task__card__title">${title}</h4>
                <p class="description trim-2-lines text-muted">${description}</p>
                <div class="taskType d-flex flex-wrap text-white">
                    <span class="badge bg-primary m-1">${type}</span>
                </div>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-outline-info float-right" data-bs-toggle="modal"
                        data-bs-target="#showTask"
                        onclick="openTask.apply(this, arguments)" id=${id}>Open Task</button>
            </div>
        </div>
    </div>
`;

// HTML and JS code for modal body on clicking of open task
const htmlModalContent = ({ id, title, description, url }) => {
    const date = new Date(parseInt(id));
    return `
        <div id=${id}>
            ${
                url
                ? `<img width="100%" src=${url} alt="Card Image" class="card-img-top md-4 rounded-lg" />`
                : `<img width="100%" src="./images/default_img.jpg" alt="Card Image" class="card-img-top md-3 rounded-lg" />`
            }
            <strong class="text-muted text-md">Assigned on ${date.toDateString()}</strong>
            <h2 class="my-2">${title}</h2>
            <p class="text-muted">${description}</p>
        </div>
    `;
}

// This 'stringify' converts JSON to a string format for local storage
const updateLocalStorage = () => {
    localStorage.setItem(
        "task",
        JSON.stringify ({
            tasks: state.taskList,
        })
    )
}

// Loading/Rendering initial data/cards for display on the screen
const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task); // Converting string back to JSON format

    if (localStorageCopy) {
        state.taskList = localStorageCopy.tasks;
    }
    state.taskList.map ((cardDate) => {
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
    })
}

// JS code for submitting or updating the cards values
const handleSubmit = (event1) => {
    const id = `${Date.now()}`;
    const input = {
        url: document.getElementById("imageUrl").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("taskDescription").value,
    };
    if (input.title === "" || input.type === "" || input.description === "") {
        return alert ("Please cum inside all the necessary fields ;-)");
    }
    taskContents.insertAdjacentHTML (
        "beforeend", htmlTaskContent({...input, id})
    );
    state.taskList.push({...input, id});
    updateLocalStorage();
};

// Spread Operator
/*
    const obj = {
        name: "Vraj",
        age: 19
    }
    console.log(obj);
    {name: 'Vraj', age: 19}

    console.log({obj});
    {obj: {...}}obj: {name: 'Vraj', age: 19} [[Prototype]]: Object

    console.log({...obj});
    {name: 'Vraj', age: 19}

    // Adding/Appending a new key into an object
    console.log({...obj, designation: 'Student'});
    {name: 'Vraj', age: 19, designation: 'Sudent'}

    // Updating a key
    console.log({...obj, age: 69});
    {name: 'Vraj', age: 69}
*/

// JS code for when you click on the open task button
// In 'htmlTaskContent', in the 'openTask' button tag, you can do onclick='openTask.apply(this, arguments)' to get the same results
const openTask = (event2) => {
    if (!event2) {
        event2 = window.event;
    }
    const getTask = state.taskList.find(({id}) => id === event2.target.id);
    taskModal.innerHTML = htmlModalContent(getTask);
}

// JS code for when you click on the delete button
const deleteTask = (event3) => {
    if (!event3) {
        event3 = window.event; // This means we are getting the event triggered in new window
    }
    const targetId = event3.target.getAttribute("name");
    // console.log(targetId); // Can do this to check the id of the trash/delete buttons
    const type = event3.target.tagName;
    // console.log(type); // Can do this to check if you are clicking on an icon or a button
    const removeTask = state.taskList.filter(({id}) => id !== targetId);
    updateLocalStorage();

    // Removing the child from UI
    /* 'Line-25' ma 'onclick' lakhelu che ema jo 'button' par click karo toh badha 'div' ma thi bahar jata
       4 parents ave, soo e karine oldest parent no child removed...else icon par click karo toh bahar jata
       5 parents ave soo that */
    if (type === "BUTTON") {
        return event3.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            event3.target.parentNode.parentNode.parentNode
        )
    }
    else if (type === "I") {
        return event3.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode.parentNode
        )
    }
}

// JS code for when you click on the edit button
const editTask = (event4) => {
    if (!event4) {
        event4 = window.event;
    }
    const targetId = event4.target.id;
    const type = event4.target.tagName;

    let parentNode, taskTitle, taskDescription, taskType, submitButton;

    // Logic for 'Line-22'
    if (type === "BUTTON") {
        parentNode = event4.target.parentNode.parentNode;
    }
    else {
        parentNode = event4.target.parentNode.parentNode.parentNode;
    }

    taskTitle = parentNode.childNodes[3].childNodes[3];
    taskDescription = parentNode.childNodes[3].childNodes[5];
    taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    submitButton = parentNode.childNodes[5].childNodes[1];

    taskTitle.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");

    submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
    submitButton.setAttribute("data-bs-toggle");
    submitButton.setAttribute("data-bs-target");
    submitButton.innerHTML = "Save Changes";
}

// JS code to save the changes after editing a task
const saveEdit = (event5) => {
    if (!event5) {
        event5 = window.event;
    }
    const targetId = event5.target.id;
    const parentNode = event5.target.parentNode.parentNode;

    const taskTitle = parentNode.childNodes[3].childNodes[3];
    const taskDescription = parentNode.childNodes[3].childNodes[5];
    const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    const submitButton = parentNode.childNodes[5].childNodes[1];

    const updateData = {
        taskTitle: taskTitle.innerHTML,
        taskDescription: taskDescription.innerHTML,
        taskType: taskType.innerHTML
    }
    let stateCopy = state.taskList;

    stateCopy = stateCopy.map((task) => 
    task.id === targetId
        ? {
            id: task.id,
            title: updateData.taskTitle,
            description: updateData.taskDescription,
            type: updateData.taskType,
            url: task.url
        }
        : task
    )
    state.taskList = stateCopy;
    updateLocalStorage();

    taskTitle.setAttribute("contenteditable", "false");
    taskDescription.setAttribute("contenteditable", "false");
    taskType.setAttribute("contenteditable", "false");

    submitButton.setAttribute("onclick", "openTask.apply(this, arguments)");
    submitButton.setAttribute("data-bs-toggle", "modal");
    submitButton.setAttribute("data-bs-target", "#showTask");
    submitButton.innerHTML = "Open Task";
}

// JS code for the search bar
const searchTask = (event6) => {
    if (!event6) {
        event6 = window.event;
    }
    while (taskContents.firstChild) {
        taskContents.removeChild(taskContents.firstChild);
    }
    const resultData = state.taskList.filter(({title}) => 
        title.toLowerCase().includes(event6.target.value.toLowerCase())
    )

    resultData.map ((cardDate) =>
        (cardDate) => taskContents.insertAdjacentElement("beforeend", htmlTaskContent(cardDate))
    )
}