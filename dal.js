let userArr = require('./userArr.js');

function addUserInfo(loginId, loginPass){
  let newLogin = {id:(userArr.length +1), username: loginId, password: loginPass};
  userArr.push(newLogin);
  console.log(newLogin);
}



// function checkLogin(loginId, loginPass){
//   return userArr.map(function(login){
//     if((login.username == loginId) && (login.password == loginPass)){
//       console.log("Success!")
//     } else {
//       console.log("Unable to Login check Username and Password.")
//     }
//   })
// }

module.export= {
  addUserInfo: addUserInfo
  // checkLogin:checkLogin
}
