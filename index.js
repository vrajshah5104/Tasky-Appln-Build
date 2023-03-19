// Local object 'state' where we store certain things
// JSON = Javascript )bject Notation
// var state = {
//     taskListArr: [
//         {
//             imageUrl: "",
//             taskTitle: "",
//             taskType: "",
//             taskDescription: ""
//         }
//     ]
// }

const state = {
    taskList: []
}

// DOM Operations
const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");