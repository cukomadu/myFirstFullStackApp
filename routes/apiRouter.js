let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Post = require('../db/schema.js').Post

//Import Task Schema created in db/schema.js
let Task = require('../db/schema.js').Task

//--------------------------------------------------------------
// Read Many - API Get Request to read from the todolist database
//--------------------------------------------------------------

//.get is a method in express for creating get requests to an API. It's setup to respond to a get request. 
//.get returns response data from the server
//.find is a mongoose method for query a database or fetching data from a server
// Task.find sends a query from the client to the server and wraps the response in json
// err is a mongo err that is returned if an invalid route is requested otherwise a response data is sent back
apiRouter.get('/todoListApp', function(request, response){
  Task.find(request.query, function(err, results){
    if(err){
      return response.json(err)
    }
    response.json(results)
  })

})

//-------------------------------------------------------------------------
// Create One - API Post Request to write new task to the todolist database
//-------------------------------------------------------------------------

//create a new instance of the Task Schema created in db/schema.js and pass new content. 
//New content is stored in request.body. Invoke the save method to save new Task to the database
//If err occurs, send error message to user otherwise send message with new Task.
apiRouter.post('/todoListApp', function(request, response){
  let newTask = new Task(request.body)
  newTask.save(function(err){
    if(err){
      return response.json(err)
    }
    response.json(newTask)
  })
})


apiRouter
  //fetch many
  .get('/posts', function(req, res){
    Post.find(req.query, function(err, results){
      if(err) return res.json(err) 
      res.json(results)
    })
  })
  //create one
  .post('/posts', function(req, res){
    let newPost = new Post(req.body)
    newPost.save(function(err){
      if(err) return res.json(err) 
 
      res.json(newPost)
    })
  })

apiRouter
  //fetch one
  .get('/posts/:_id', function(req, res){
    Post.findById(req.params._id, function(err, record){
      if(err || !record) return res.json(err)  
      res.json(record)
    })
  })
  //edit one
  .put('/posts/:_id', function(req, res) {
    Post.findById(req.params._id, function(err,record) {
      let recordWithUpdates = helpers.updateFields(record,req.body)
      recordWithUpdates.save(function(err){
        if(err || !record) return res.json(err) 
        res.json(record)
      })
    })
  })
  //delete one
  .delete('/posts/:_id', (req, res) => {
    Post.remove({ _id: req.params._id}, (err) => {
      if(err) return res.json(err)
      res.json({
        msg: `record ${req.params._id} successfully deleted`,
        _id: req.params._id
      })
    })  
  })

  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password",function(err, record){
        if(err || !record) return res.json(err)
        let recordWithUpdates = helpers.updateFields(record, req.body)
        recordWithUpdates.save(function(err){
          if(err) return res.json(err) 
          res.json(recordWithUpdates)
        })
      })
    })
    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })

module.exports = apiRouter