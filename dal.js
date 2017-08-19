  let users = [
    {id: 1, name: 'Brandon Aiton', username: 'brandon', password: 'example'},
    {id: 2, name: 'Andrew Aiton', username: 'andrew', password: 'password'},
    {id: 3, name: 'New Friend', username: 'guest', password: 'password'},

  ]

function getUser(userId){
  const foundUser = users.find(usr => Number(userId) === usr.id)
  return foundUser                                                // when passed a number looks through to find same userid number
}

function getUserByUsername (usrname) {
  const foundUser = users.find(usr => usrname === usr.username)
  return foundUser                                                // takes a username and looks through an array to find the username used in arguement
}

function getUsers(){
  return users;                                                   // gives array of users when called
}

module.exports= { getUsers, getUserByUsername, getUser }
