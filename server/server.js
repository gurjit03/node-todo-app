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

app.listen(PORT,() => {
  console.log('app is running at PORT'+PORT);
})
