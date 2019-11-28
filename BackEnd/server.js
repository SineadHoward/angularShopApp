// server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://sinead:celtic90@cluster0-5qrii.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoDB, {useNewUrlParser:true});

const Schema = mongoose.Schema;

const listSchema = new Schema({
  item:String,
  price:String,
  itemImage:String
});

const ListModel = mongoose.model('list',listSchema);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world');
})

app.get('/api/list', (req,res,next) => {

  console.log("get request")
  ListModel.find((err,data)=>{
    res.json({list:data});
  })
})

app.delete('/api/list/:id', (req,res) =>{
  console.log(req.params.id);

  ListModel.deleteOne({_id:req.params.id},(error,data)=>{
    if(error)
      res.json(error);
      
    res.json(data);
  })
})

app.get('/api/list/search/:item/:criteria', (req,res)=>{
  console.log(req.params.item);
  console.log(req.params.criteria);
if(req.params.criteria == 'item')
  {
  ListModel.find({ 'item': req.params.item},
(error,data) =>{
  res.json(data);
})
  }
})


app.post('/api/list', (req,res) =>{
console.log('post Sucessfull');
console.log(req.body)
console.log(req.body.item);
console.log(req.body.price);
console.log(req.body.itemImage
  );

ListModel.create({
  item: req.body.item,
  price: req.body.price,
  itemImage: req.body.itemImage
});
res.json('data uploaded')


})

app.get('/api/list/:id',(req,res)=>{
  console.log(req.params.id);

  ListModel.findById(req.params.id, (err, data)=>{
    res.json(data);
  })
})


app.put('/api/list/:id', (req, res)=>{
  console.log(req.body);
  console.log("Edit "+req.params.id);

  ListModel.findByIdAndUpdate(req.params.id,
    req.body, {new:true}, (error, data)=>{
      res.send(data);
    })
})

app.listen(PORT, function () {
  console.log('Server is running on Port: ', PORT);
});