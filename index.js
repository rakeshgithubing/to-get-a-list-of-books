const express = require("express"); // import a express packages
const app = express(); // instance of the express
const { open } = require("sqlite"); // import a sqlite packages
const sqlite3 = require("sqlite3"); // import a sqlite3 packages
const path = require("path"); // import a core module path

let db = null; // intialization a db connection object.

const dbPath = path.join(__dirname, "goodreads.db"); // locate a path

const intializeDbAndServer = async () => {
  try {
    db = await open({
      // db object connection syntax and open() method returns a promise object that's why use a async,await calls
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      // server is start to execute a callback function
      console.log("Server is Running at http://localhost:3000/"); // terminal to print a message to server starts
    });
  } catch (e) {
    // if in the request are processing any error to execute below lines of code.
    console.log(`db error is ${e.message}`);
    process.exit(1);
  }
};

// get list of books from the query
app.get("/books", async (request, response) => {
  const booksQuery = `SELECT * FROM book`; // sql query in the string format.
  const booksArray = await db.all(booksQuery); // all() is the returns a promise object that's why to use a await,async calls
  response.send(booksArray); // response to give a list of books in the array format.
});

intializeDbAndServer(); // in this function to create a db object connection.
