const session = require('express-session');
const flush=require('connect-flash');


  const flushmessage=(req, res, next)=>{
    res.locals.successMessage = req.flash('success');
    res.locals.errorMessage = req.flash('error');
    next();
  }
  module.exports={
    flushmessage
  }