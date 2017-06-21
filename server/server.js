var {ObjectID} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose.js');
var { User } = require('./models/User.js');
var { Todo } = require('./models/Todo.js');

var app = express();
const PORT = 3000;

app.use(bodyParser());

app.post('/todos',(req,res) => {
  console.log(req.body)
  var todo = new Todo({
    text: req.body.text
  })

  todo.save().then(doc => {
    res.status(200).send(doc)
  },(e) => {
    res.status(400).send(e)
  })
})

app.get('/todos',(req,res) => {
  Todo.find().then(todos => {
      res.send({
        todos,
        'custom': "This is my own creation"
      })
  },(e) => {
      res.send(e)
  })
})

app.get('/todo/:id',(req,res) => {
  const id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send({
      message: "id is not valid"
    });
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send()
    }
    res.send(todo);
  }).catch(e => {
    res.status(400).send(e);
  })
})

app.listen(PORT,() => {
  console.log('app is running at PORT'+PORT);
})
