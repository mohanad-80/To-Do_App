import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;
var todayTasks = [];
var workTasks = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { theTasks: todayTasks });
});

app.get("/work", (req, res) => {
  res.render("work.ejs", { theWorkTasks: workTasks });
});

app.post("/", (req, res) => {
  if (req.body["new-task"] !== undefined) {
    todayTasks.push(req.body["new-task"]);
  }
  res.render("index.ejs", { theTasks: todayTasks });
  console.log(todayTasks);
});

app.post("/work", (req, res) => {
  if (req.body["new-task"] !== undefined) {
    workTasks.push(req.body["new-task"]);
  }
  res.render("work.ejs", { theWorkTasks: workTasks });
  console.log(workTasks);
});

app.post("/delete-today", (req, res) => {
  todayTasks = [];
  res.render("index.ejs", { theTasks: todayTasks });
});

app.post("/delete-work", (req, res) => {
  workTasks = [];
  res.render("work.ejs", { theWorkTasks: workTasks });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
