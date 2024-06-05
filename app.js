const express = require("express");
const connect = require("./connect");

const app = express();

// middlware
app.use(express.static("./client"));
app.use(express.json());

// Data model (schema)
const tasks = require("./task");

// HTTP request listners

// Define a simple route
app.get("/list", async (req,res)=>{
  try {
    const task = await tasks.find({}); 
    res.status(200).json({task});
  } catch (err) {
    res.status(500).json({msg: err});
  };
});

app.post("/list", async (req,res) => {
    try {
        await tasks.create({
            name: req.body.name
        });
        res.status(200).json({msg: 'Successfully created task.'});
    } catch (err) {
        res.status(500).json({msg: err});
    }
});

app.put("/list", async (req,res) => {
    try {
        await tasks.updateOne(
            {name: req.body.name }, 
            {completed: true }
        );
        res.status(200).json({msg: 'Successfully updated task.'});
    } catch (err) {
        res.status(500).json({msg: err});
    }
});

app.delete("/list", async (req,res) => {
    try {
        await tasks.deleteOne(
            {name: req.body.name }
        );

        res.status(200).json({msg: 'Successfully deleted task.'});
    } catch (err) {
        res.status(500).json({msg: err});
    }
});

// page not found route
app.all("*", (req,res) => {
    res.status(404).send("<h1>Page Not Found...</h1>");
});
const port = 5500;
const appName = 'Task Manager';
// Connect to the database and start the appl server
(async function () {
    try {
      await connect();
      app.listen(port, () => {console.log(`${appName} is listening on port ${port}.`)});
    } catch (error) {
      console.log(error);
    };
  })();