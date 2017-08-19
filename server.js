const session = require('express-session')
const mustache = require('mustache-express')
const express = require('express')
const nodemon = require('nodemon')
const bodyParser = require('body-parser')
const dal = require('./dal.js')
const app = express();

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', __dirname + "/views");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('./public'));

app.use(
  session({
    secret: 'this is cool',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null }
  })
)

app.use(function (req, res, next) {
  if (req.session.usr) {                                                    //truthy statement that says there is a current user
    req.isAuthenticated = true
  } else {
    req.isAuthenticated = false
  }
  console.log(req.session, 'req.session')
  next()
})
// *********************-Routes-***********************
app.get('/', function(req, res){                                          // at the url '/'
                                                                          // console.log(req.session)  this will show the cookies from this page
  res.render("home", {isAuthenticated: req.isAuthenticated})
})

app.get('/admin', function (req, res) {                                   //at the url '/admin'
  if (req.isAuthenticated) {
  const users = dal.getUsers()                                            //give the array of users when called
    res.render('admin', { users: users, loggedUsr: req.session.usr })     //create admin.mustach if authenticated
  } else {
  res.redirect('/')                                                       //redirect to '/'
  }
})

app.get('/login', function(req, res){                                     // at the url '/login'
  res.render("login")                                                     // create page login.mustache
})

app.get('/loggedout', function(req, res){                                 // at the url '/loggedout/'
  req.session.destroy()                                                   //end logged in session when visited
  res.render("loggedout")                                                 // show the loggedout mustache file
})



app.post('/login', function (req, res) {                                 //when the post from action '/login' come through
  const foundUsr = dal.getUserByUsername(req.body.username)              //passes username to check for matching username information
  if (req.body.password === foundUsr.password) {
    console.log(req.session.usr);                        //checks for matching passwords
    req.session.usr = { name: foundUsr.name }                            // I dunno why but we reasign the session usrname here??? seems odd.
    res.redirect('/')                                                    //send to the url '/admin'
  } else {
    res.send('womp womp')                                                //show text 'womp womp' if pasword doesnt match the called username.
  }
})


app.set('port', 3000);
app.listen(3000, function(){
  console.log("Application has started at port 3000");
})
