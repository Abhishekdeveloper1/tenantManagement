const session = require('express-session');

const sessionMiddleware = session({
  secret: 'yourSecretKey',
  resave: false,           
  saveUninitialized: false,
  cookie: { maxAge: 60000 * 60 * 24 },
});


module.exports=sessionMiddleware;
