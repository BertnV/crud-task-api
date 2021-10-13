const mongoose = require('mongoose');
//SCHEMA
const TaskSchema = new  mongoose.Schema({
    //CONSTRAINT
    title: {
        type: String,
        trim: true,
        minlength: 3
        },
        _taskListId: {
            type: mongoose.Types.ObjectId, 
            required: true      
        },
        completed: {
            type: Boolean,
            default: false,
            reuired: true
        },
        
})
// COLLECTION
const Task = mongoose.model('Task', TaskSchema)
// MODULE TO EXPORT THE MODEL
module.exports = Task;