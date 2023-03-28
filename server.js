const http = require("http");

const port = 8081; // Local Port number - 3000 for Front-end and 8081 for Back-end

const toDoList = ["learn", "apply", "succeed"]; // Here 'toDoList' is an instance variable

http
    .createServer((req, res) => { // Call back function
        const { method, url } = req;
        if (url === "/todos") {
            if (method === "GET") {
                res.writeHead(200);
                res.write(toDoList.toString());
            }
        }
        // res.writeHead(200, {"Content-Type": "text/html"}); // Like 404 is for server not found, 200 is for OK/SUCCESS
        // res.write("<h2>Hey the server has started!</h2>");
        res.end();
    })
    .listen(port, () => { // Call back function
        console.log(`NodeJs Server Started Running on Port ${port}`);
    });

// http://localhost:8081

// Continue from Day-38 20:23