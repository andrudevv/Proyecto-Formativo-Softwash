import { config } from "./../config/config.js";

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
    return next();
  } else {
    next(new Error("no esta autorizado"));
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role) || user.membership === true ) {
      next();
    } else {
      next(new Error("no esta autorizado"));
    }
  };
}

export { checkApiKey, checkLaundry, checkRoles };
