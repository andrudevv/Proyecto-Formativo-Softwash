
require('dotenv').config();
function checkApiKey(req, res, next) {
  const apiKey = req.headers["api"];
  if (apiKey === config.apikey) {
    next();
  } else {
    next(new Error("no autorizado"));
  }
}

function checkLaundry(req, res, next) {
  const user = req.user;
  if (user.membership === true) {
    next();
  } else {
    next(new Error("no esta autorizado"));
  }
}

//  function checkRoles(...roles) {
//   return (req, res, next) => {
//     const user = req.user;
//     if (roles.includes(user.role) || user.membership === true ) {
//       next();
//     } else {
//       next(new Error("no esta autorizado"));
//     }
//   };
// }
function checkUser(req, res, next) {
  const user = req.user;
  if (user.hasOwnProperty('document')) {
    next();
  } else {
    next(new Error("no esta autorizado"));
  }
}
function checkShared(req,res, next) {
      const user = req.user;
      if (user.hasOwnProperty("document") || user.membership === true ) {
        next();
      } else {
        next(new Error("no esta autorizado"));
      }
    
  }

module.exports = {checkApiKey,checkLaundry,checkShared,checkUser };
