//Dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//Config
const app = express();
const port = 3001;
const { Schema } = mongoose;

//MiddelWare
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Connect to mongoDB
mongoose
  .connect(
    `mongodb+srv://mernDB:MYPASSWORD@cluster0.lo8cq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch((err) => console.log(err));

//data schema
const itemSchema = new Schema({
  title: String,
  description: String,
});

//data model
const Item = mongoose.model("Item", itemSchema);

//create route
app.post("/newItem", (req, res) => {
  console.log(typeof req.body);

  if (typeof req.body === "object") {
    const newItem = new Item({
      title: req.body.title,
      description: req.body.description,
    });
    newItem
      .save()
      .then((item) => console.log(item))
      .catch((err) => res.status(400).json(`Error ${err}`));
  }
});

//read route
app.get("/items", (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

//edit route
app.put("/put/:id", (req, res) => {
  const id = req.params.id;
  const updatedItem = {
    title: req.body.title,
    description: req.body.description,
  };
  Item.findByIdAndUpdate(
    { _id: id },
    { $set: updatedItem },
    (req, res, err) => {
      if (!err) {
        console.log(`Item Updated`);
      } else {
        console.log(err);
      }
    }
  );
});

//delete route
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Item.findByIdAndDelete({ _id: id }, (req, res, err) => {
    if (!err) {
      console.log(`Item Deleted`);
    } else {
      console.log(err);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running  on ${port}`);
});
