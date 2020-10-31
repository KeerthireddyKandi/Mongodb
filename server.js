const cors = require('cors');
const express = require('express');
const app = express()
const port = 3000;
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const budget_model = require("./models/schema");

let url = "mongodb://localhost:27017/part2database";

app.use(cors());
app.use(bodyParser.json())
app.use("/", express.static("public"));

app.get('/budget', (req,res) => { 
  mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
      .then(()=> {
          console.log("Connected to the database");
          budget_model.find({})
                    .then((data) =>{
                        console.log(data);
                        res.send(data);
                        mongoose.connection.close();
                    })
                    .catch((connectionError) =>{
                        console.log(connectionError);
                    })
      })
      .catch((connectionError) => {
          console.log(connectionError);
      })
  
});

app.post('/budget', (req,res) => { 
  mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
      .then(()=> {
          console.log("Connected to the database");
          let data = new budget_model(req.body);
          console.log(data);
          budget_model.insertMany(data)
                    .then((data) =>{
                        console.log(data);
                        res.status(200).send("The Data has been inserted Successfully");
                        mongoose.connection.close();
                    })
                    .catch((connectionError) =>{
                        console.log(connectionError);
                        res.status(400).send();
                    })
      })
      .catch((connectionError) => {
          console.log(connectionError);
          res.status(400).send();
      })
  
});

app.listen(port, () => {
  console.log(`API served at http//:localhost${port}`)
});