const express = require("express");
const mongoose = require("mongoose");
const person = require("./module/databas");
const bodyParser = require("body-parser");
const moment = require("moment");
const Swal = require('sweetalert');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.get("/", (req, res) => {
  person
    .find()
    .then((result) => {
      res.render("index", { arr: result, moment: moment });
    })
    .catch((err) => console.log(err));
});
app.get("/user/add.html", (req, res) => {
  res.render("user/add", {Swal:Swal});
});
app.post("/user/add.html", async (req, response) => {
  try {
    const res = await person.create(req.body);
    response.json(res);
  } catch (err) {
    console.log(err);
    response.status(500).json({ error: "An error occurred" });
  }
});
// show user profile
app.get("/user/:id", (req, response) => {
  const id = req.params.id;
  person
    .findById(id)
    .then((result) => {
      response.render("user/view", { result: result, moment: moment });
    })
    .catch((err) => console.log(err));
  console.log(id);
});
// edit user
app.get("/edit/:id", (req, response) => {
  const id = req.params.id;
  person
    .findById(id)
    .then((result) => {
      response.render("user/edit", { result: result });
    })
    .catch((err) => console.log(err));
});

app.post("/edit", (req, response) => {

  const data =req.body
  const id =req.body.id
  console.log(data)
  delete data.id
 person.updateOne({_id:id},data).then(result =>{
console.log(result)
  response.json({ok:true})
 }).catch((err)=> console.log(err))

})
// delete 
app.post('/delete' ,(req,response)=>{
  const id=req.body.id
  console.log(id)
  person.deleteOne({ _id: id }).then(result=>{
    console.log(result)
    response.json({result})
  }).catch(err => console.log(err))
})
const port = 4000;
mongoose
  .connect(
    "mongodb+srv://mostafaisa208:mostafaisa208@cluster0.rtn4kr5.mongodb.net/"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    console.log("connected to database");
  })
  .catch((err) => console.log(err));
