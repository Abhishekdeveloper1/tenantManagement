const session = require('express-session');
const FileStore = require('session-file-store')(session);

const sessionMiddleware = session({
  secret: 'abhishek123411o100!223',
  resave: false,           
  saveUninitialized: false,
  cookie: { maxAge: 60000 * 60 * 24 },
});


module.exports=sessionMiddleware;
