const { response } = require('express');
const express = require ('express');
const app = express();
const mongoose = require('./database/mongoose');

const TaskList = require('./database/models/taskList');
const Task = require('./database/models/task');


/*
CORS- Cross Origin Request Security
Backend- http//localhost:3000
Frontend - http//localhost:4200
*/

// another 3rd party library that we can use instead of the code below is and to use it  we just type app.use(cors());
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // Pass to next layer of middleware
    next();
});
// Middleware
app.use(express.json()); // or use 3rd party body parser

//Routes or REST API Endpoints or RESTFUL Webservices Endpoints
/*
Tasklist- Create, Update, ReadTaskListById, ReadAllTaskList
Task- Create, Update, ReadTaskById, ReadAllTask
*/

// Routes or API endopints for TaskList model
// GET All Lists
// http://localhost:3000/taskLists => [ {TaskList}, {TaskList} ]
//https://restapitutorial.com/lessons/httpmethods.html

//app.get('/taskLists', function(req, res) {code});
app.get('/taskLists', (req, res) => {
    TaskList.find({})
    .then((lists) => {
        res.status(200).send(lists);    
    })
    .catch((error)=>{
        res.status(500);
        console.log(error)
    });
}); 

//ENDPOINT TO GET ONE TASKLIST BY TASKLISTID : http://localhost:3000/tasklists/616244b4acf019ee7b8d295c
app.get(
    '/tasklists/:tasklistId', (req, res)=>{
        let tasklistId = req.params.tasklistId;
        TaskList.find({ _id: tasklistId})
        .then((taskList)=>{
            res.status(200).send(taskList)
        })
        .catch((error)=>{console.log(error)});  
    }
);

//ROUTE ENDPOINT FOR CREATING A TASK LIST
app.post('/tasklists', (req, res)=> {
    //console.log("Hello I am inside the post")

    console.log(req, res);
let taskListObj = { 'title': req.body.title}

    console.log(req.body);
   TaskList(taskListObj).save()
        .then((tasklist) => {
            res.status(201).send(tasklist);
        })
        .catch((error) => {
            res.status(500);
            console.log(error) });
   });

   app.put('/tasklists/:tasklistId', (req, res)=>{
        TaskList.findOneAndUpdate({ _id: req.params.tasklistId}, { $set: req.body})
        .then((taskList)=>{
            res.status(200).send(taskList)
        })
        .catch((error)=>{console.log(error)}); 
   });

   app.patch('/tasklists/:tasklistId', (req, res)=>{
    TaskList.findOneAndUpdate({ _id: req.params.tasklistId}, { $set: req.body})
    .then((taskList)=>{
        res.status(200).send(taskList)
    })
    .catch((error)=>{console.log(error)}); 
});

// Delete TaskList item by id
app.delete('/tasklists/:tasklistId', (req, res)=>{
    TaskList.findByIdAndDelete(req.params.tasklistId)
    .then((taskList)=>{
        res.status(201).send(taskList)
    })
    .catch((error)=>{console.log(error)}); 
});

/*CRUD operation for task, a task should always belong to a 'taskList */
//Get all tasks for 1 taskList URl, //http://localhost:3000/tasklists/:tasklistId/tasks
app.get('/tasklists/:tasklistId/tasks', (req, res)=>{
    Task.find({ _taskListId:  req.params.tasklistId })
    .then((tasks)=>{
        res.status(200).send(tasks)
    })
    .catch((error)=>{console.log(error)}); 
});

// Create task inside 1 particular Task list
app.post('/tasklists/:tasklistId/tasks', (req, res)=> {
    console.log(req, res);
let taskObj = { 'title': req.body.title, '_taskListId': req.params.tasklistId};
console.log(req.body);
   Task(taskObj).save()
        .then((task) => {
            res.status(201).send(task);
        })
        .catch((error) => {
            res.status(500);
            console.log(error) });
   });

// Get one task lfor 1 task list URL http://localhost:3000/tasklists/:tasklistId/tasks/:taskId
// Get one task inside 1 TaskList
app.get('/tasklists/:tasklistId/tasks/:taskId', (req, res)=>{
    Task.findOne({ _taskListId:  req.params.tasklistId, _id: req.params.taskId})
    .then((task)=>{
        res.status(200).send(task)
    })
    .catch((error)=>{console.log(error)}); 
}); 

// update 1 task belonging to 1 TaskList
app.patch('/tasklists/:tasklistId/tasks/:taskId', (req, res)=>{
    Task.findOneAndUpdate({ _taskListId: req.params.tasklistId, _id: req.params.taskId}, { $set: req.body})
    .then((task)=>{
        res.status(200).send(task)
    })
    .catch((error)=>{console.log(error)}); 
});

//Delete 1 task from 1 taskList
app.delete('/tasklists/:tasklistId/tasks/:taskId', (req, res)=>{
    Task.findOneAndDelete({ _taskListId: req.params.tasklistId, _id: req.params.taskId})
    .then((task)=>{
        res.status(200).send(task)
    })
    .catch((error)=>{console.log(error)}); 
});

app.listen(3000, () => {
    console.log("Server started on port 3000 Nice");
});