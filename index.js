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
                <button type="button" class="btn btn-outline-primary mr-1.5" name=${id}>
                    <i class="fa-solid fa-pen-fancy" name=${id}></i>
                </button>
                <button type="button" class="btn btn-outline-danger mr-1.5" name=${id}>
                    <i class="fa-solid fa-trash-can" name=${id}></i>
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
                        data-bs-target="#showTask">Open Task</button>
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
const handleSubmit = (event) => {
    const id = `${Date.now()}`;
    const input = {
        url: document.getElementById("imageUrl").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("taskDescription").value,
    };
    // if (input.title=="" || input.tags=="" || input.description=="") {
    //     return alert("Please cum inside all the necessary fields ;-)");
    // }
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