const http = require("http");

const port = 8081; // Local Port number - 3000 for Front-end and 8081 for Back-end

const toDoList = ["learn", "apply", "succeed"]; // Here 'toDoList' is an instance variable

http.createServer((req, res) => { // Call back function with two methods request and response
        const { method, url } = req; // With url we can fetch the root
        if (url === "/todos") { // If the root is 'todos' otherwise 404 error
            if (method === "GET") {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(toDoList.toString());
            }
            else if (method === "POST") {
                let body = "";
                req.on("error", (err) => {
                    console.log(err);
                }).on("data", (chunk) => {
                    body += chunk;
                    // console.log(chunk);
                }).on("end", () => {
                    body = JSON.parse(body);
                    let newToDo = toDoList;
                    newToDo.push(body.item); // Item to be added to the new array
                    console.log("Data : ", body);
                })
            }
            else if (method === "DELETE") {
                let body = "";
                req.on("error", (err) => {
                    console.error(err); // Will give error statement in red color
                }).on("data", (chunk) => {
                    body += chunk;
                }).on("end", () => {
                    body = JSON.parse(body);
                    let deleteThisItem = body.item;
                    for (let i=0; i<toDoList.length; i++) {
                        if (toDoList[i] === deleteThisItem) {
                            toDoList.splice(i, 1);
                            break;
                        }
                    }
                    // ORRRRRRRRRRRR
                    // toDoList.find((ele, index) => {
                    //     if (ele === deleteThisItem) {
                    //         toDoList.splice(index, 1);
                    //     }
                    //     else {
                    //         console.error("Error: Match not found!");
                    //     }
                    // })
                })
            }
            else {
                res.writeHead(501);
            }
        }
        else {
            res.writeHead(404);
        }
        // res.writeHead(200, {"Content-Type": "text/html"}); // Like 404 is for server not found, 200 is for OK/SUCCESS
        // res.write("<h2>Hey the server has started!</h2>");
        res.end();
    })
    .listen(port, () => { // Call back function
        console.log(`NodeJs Server Started Running on Port ${port}`);
    });

// Root = http://localhost:8081