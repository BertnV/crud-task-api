const mongoose = require('mongoose');
//SCHEMA
const TaskListSchema = new  mongoose.Schema({
    //CONSTRAINT
    title: {
    type: String,
    trim: true,
    minlength: 3
    }
})
// COLLECTION
const TaskList = mongoose.model('TaskList', TaskListSchema)
//MODULE TO EXPORT THE MODEL
module.exports = TaskList;