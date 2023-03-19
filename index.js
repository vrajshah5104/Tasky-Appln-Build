// JSON = Javascript )bject Notation
// Local object 'state' where we store certain things
// Inspect element karine console na badle application par jao toh key and value made je store thay eni
// It's a local storage jene apde set, get and delete kari shakiye and it has less response time

const state = {
    taskList: []
}

// DOM Operations
const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

// JS and HTML code for template for the card on screen
// id, key, ${} can be used to access JS into HTML
const HtmlTaskContent = ({id, title, description, type, url}) => `
    <div class='col-md-6 col-lg-4 mt-3'id=${id}>
        <div class="card shadow task__card">
            <div class="card-header d-flex justify-content-end task__card__header">
                <button type="button" class="btn btn-outline-primary" name=${id}>
                    <i class="fa-solid fa-pen-fancy" name=${id}></i>
                </button>
                <button type="button" class="btn btn-outline-danger" name=${id}>
                    <i class="fa-solid fa-trash-can" name=${id}></i>
                </button>
            </div>
            <div class="class-body">
                ${
                    url &&
                    `<img width='100%' src=%{url} alt="Card Image" class="card-img-top md-3 rounded-lg" />`
                }
                ${
                    url &&
                    `<img width='100%' src=%{https://bestlifeonline.com/wp-content/uploads/sites/3/media/images/ext/537721635/dacx20_313_03-0001_hires2.jpg?quality=82&strip=all}
                          alt="Card Image" class="card-img-top md-3 rounded-lg" />`
                }
                <h4 class="card-title task__card__title">${title}</h4>
                <p class="description trim-2-lines text-muted>${description}</p>
                <div class="taskType d-flex text-white">
                    <span class"badge bg-primary m-1">${type}</span>
                </div>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-outline-info float-right data-bs-toggle="modal"
                        data-bs-target="#showTask">Open Task</button>
            </div>
        </div>
    </div>
`;

// HTML and JS code for modal body on clicking of open task
const htmlModalContent = ({id, title, description, url}) => {
    const date = new Date(parseInt(id));
    return `
        <div id=${id}>
            ${
                url &&
                `<img width='100%' src=%{url} alt="Card Image" class="img-fluid place__holder__image" />`
            }
            ${
                url &&
                `<img width='100%' src=%{https://bestlifeonline.com/wp-content/uploads/sites/3/media/images/ext/537721635/dacx20_313_03-0001_hires2.jpg?quality=82&strip=all}
                      alt="Card Image" class="img-fluid place__holder__image mb-2" />`
            }
            <strong class="text-muted text-md">Assigned on ${date.toDateString()}</strong>
            <h2 class="mg-2">${title}</h2>
            <p class="text-muted">${description}</p>
        </div>
    `;
}

const updateLocalStorage = () => {
    localStorage.setItem(
        "task",
        JSON.stringify ({ // This 'stringify' converts json to a string format
            task: state.taskList
        })
    )
}