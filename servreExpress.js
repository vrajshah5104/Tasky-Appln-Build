const express = require("express");

const app = express();
app.use(express.json());

const port = 8081;

const toDoList = ["learn", "apply", "succeed"];

app.get("/todos", (req,res) => {
    res.status(200).send(toDoList);
}) // No need to write if-else conditions like NodeJs or capital http methods

app.post("/todos", (req,res) => {
    let newToDoItem = req.body.name;
    toDoList.push(newToDoItem);
    res.status(201).send({message: "Task Added Successfully"});
})

app.delete("/todos", (req,res) => {
    const deleteThisItem = req.body.name;
    toDoList.find((ele, index) => {
        if (ele === deleteThisItem) {
            toDoList.splice(index, 1);
        }
        res.status(202).send({message: `Deleted item ${req.body.name}`});
    })
})

// This is like a homepage, any other root that you write will be logged to this request irrespective of any kind of hhtp method
app.all("/todos", (req,res) => {
    res.status(501).send();
})

app.listen(port, () => {
    console.log(`NodeJs Server started running on port ${port}`);
})

// Root = http://localhost:8081/todos