const express = require('express');


let todos = [];
//call the express and Body-parser
const app = express();
const PORT = process.env.PORT||3000
app.use(express.urlencoded({extended: true}));

//serving static files
app.use(express.static('public'));
//we installed the ejs and created a file inside the views
app.set('view engine', 'ejs');

//We set up the route for the App. We first use the app.get option.
app.get('/', function (req, res) {
  res.render('index', { todos: todos});
});


//add note
app.get('/addTodo', function (req, res) {
    res.render('addTodo');
  });



//then, we use app.post option.
app.post("/addTodo", function (req, res) {
  //assigning Note id to the notes using math.random
  const userTodo = {
id : Math.random() * 100,
  todo : req.body.todo
}
  todos.push(userTodo);
  //then we redirect it to the root route
  res.redirect('/');
});



//Handling the delete request
app.post('/deleteTodo/:id', function (req, res) {
  console.log(req.params.id);
  const deleteTodo = todos.filter(item => item.id != req.params.id);
  todos = deleteTodo;
  return res.redirect('/');
});

//then we set our server port. This should always be at bottom.
app.listen(PORT, () => {
  console.log("Appserver is running at port 3000...")
});