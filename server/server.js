const _ = require('lodash');
const express = require('express');
const { ObjectID } = require('mongodb');
const bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose.js');
var { User } = require('./models/User.js');
var { Todo } = require('./models/Todo.js');

var app = express();
const PORT = process.env.PORT || 3000;

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

app.delete('/todo/:id',(req,res) => {

  const id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send({
      message: "id is not valid"
    });
  }

  Todo.findAndRemoveById(id).then(todo => {
    if(!todo) {
      return res.status(404).send()
    }
    res.send(todo)
  }).catch(e => {
    res.status(400).send(e);
  })
})

// updating the todo
app.patch('/todo/:id',(req,res) => {
  const id = req.params.id;
  const updatedProperties = _.pick(req.body,['text','completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send({
      message: 'object id is not valid'
    });
  }

  if(_.isBoolean(updatedProperties.completed)
    && updatedProperties.completed) {
      updatedProperties.completedAt = new Date().getTime();
  }else {
      updatedProperties.completed = false;
      updatedProperties.completedAt = null
  }

  Todo.findByIdAndUpdate(id,{$set: updatedProperties},{new: true})
  .then(todo => {
    if(!todo) {
      return res.status(400).send({
        message : 'no todo found'
      });
    }
    res.send(todo);
  }).catch(e => {
    res.status(404).send({
      message: e.message
    });
  })
})

app.listen(PORT,() => {
  console.log('app is running at PORT'+PORT);
})
