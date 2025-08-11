const http = require("http");
const fs = require("fs");

const homepageHTML = fs.readFileSync("./navbar-app/index.html");
const homepageStyle = fs.readFileSync("./navbar-app/styles.css");
const homeImage = fs.readFileSync("./navbar-app/logo.svg");
const homeLogic = fs.readFileSync("./navbar-app/browser-app.js");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(homepageHTML);
  } else if (req.url === "/about.html") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>About Page</h1>");
  } else if (req.url === "/projects.html") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Projects Page</h1>");
  } else if (req.url === "/contact.html") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Contact Page</h1>");
  } else if (req.url === "/styles.css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    res.end(homepageStyle);
  } else if (req.url === "/logo.svg") {
    res.writeHead(200, { "Content-Type": "image/svg+xml" });
    res.end(homeImage);
  } else if (req.url === "/browser-app.js") {
    res.writeHead(200, { "Content-Type": "text/javascript" });
    res.end(homeLogic);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 not found page!");
  }
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
