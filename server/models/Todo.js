const mongoose = require('mongoose');

const TodoSchema = {
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Number,
    default: null
  }
}

var Todo = mongoose.model('Todo',TodoSchema);

module.exports = {
  Todo
}
