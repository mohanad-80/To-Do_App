import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://honda:f1WF0dKYNUkUIx9p@cluster0.egerqdk.mongodb.net/todolistDB");

const itemsSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemsSchema);
const WorkItem = mongoose.model("Work", itemsSchema);

const item1 = new Item({ name: "Welcome to your todolist!" });
const item2 = new Item({ name: "Hit the + button to add new task." });
const item3 = new Item({ name: "<-- Hit this to delete an item." });

const defaultItems = [item1, item2, item3];

app.get("/", (req, res) => {
  Item.find({})
    .then((foundItems) => {
      if (!foundItems.length) {
        Item.insertMany(defaultItems)
          .then(() => {
            console.log("Default items added succesfully.");
          })
          .catch((err) => {
            console.log(err);
          });
      }

      res.render("index.ejs", { theTasks: foundItems });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/work", (req, res) => {
  WorkItem.find({})
    .then((foundItems) => {
      if (!foundItems.length) {
        WorkItem.insertMany(defaultItems)
          .then(() => {
            console.log("Default items added succesfully.");
          })
          .catch((err) => {
            console.log(err);
          });
      }

      res.render("work.ejs", { theWorkTasks: foundItems });
    })
    .catch((err) => {
      console.log(err);
    });
});


// post req to add a new task to the Today list.
app.post("/", (req, res) => {
  const itemName = req.body["new-task"];

  if (itemName !== undefined) {
    const newItem = new Item({ name: itemName });
    newItem.save();
  }

  res.redirect("/");
});

// post req to add a new task to the Work list.
app.post("/work", (req, res) => {
  const itemName = req.body["new-task"];

  if (itemName !== undefined) {
    const newItem = new WorkItem({ name: itemName });
    newItem.save();
  }

  res.redirect("/work");
});

// post req to delete all the tasks in the Today list.
app.post("/delete-today", (req, res) => {
  mongoose.connection.db.dropCollection("items", function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/");
});

// post req to delete all the tasks in the Work list.
app.post("/delete-work", (req, res) => {
  mongoose.connection.db.dropCollection("works", function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/work");
});

// post req to delete one task from the Today list.
app.post("/today-list", (req, res) => {
  let id = req.body.checkbox;
  Item.findByIdAndDelete(id)
  .then(() => {
    console.log("item deleted succesfully!");
  })
  .catch((err) => {
    console.log(err);
  });
  res.redirect("/");
});

// post req to delete one task from the Today list.
app.post("/work-list", (req, res) => {
  let id = req.body.checkbox;
  WorkItem.findByIdAndDelete(id)
    .then(() => {
      console.log("item deleted succesfully!");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/work");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
