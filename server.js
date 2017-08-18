const session = require('express-session')
const mustache = require('mustache-express')
const express = require('express')
const nodemon = require('nodemon')
const dal = require('./dal.js')
const app = express();

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', __dirname + "/views");

app.use(express.static('public'));
// app.use(session({
//   genid: function(req) {
//     return genuuid() // use UUIDs for session IDs
//   },
//   secret: 'keyboard cat'
// }))


app.get('/login', function(req, res){
  res.render("login")
})

app.post('/login', function(req,res){
  dal.addUserInfo(req.params.username, req.params.password);  //wtf username and password *************
  // dal.checkLogin(req.body.username, req.body.password)
  res.redirect('/');
})

app.get('/', function(req, res){
  res.render("home")
})


app.set('port', 3000);
app.listen(3000, function(){
  console.log("Application has started at port 3000");
})
