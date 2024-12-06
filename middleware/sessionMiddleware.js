const session = require('express-session');
const FileStore = require('session-file-store')(session);

const sessionMiddleware = session({
  secret: 'abhishek123411o100!223',
  resave: false,           
  saveUninitialized: false,
  cookie: { maxAge: 60000 * 60 * 24 },
});
const checkSession=(req,res,next)=>{
  if(req.session && req.session.user)
  {
    next();
  }
  else
  {
    res.redirect('/');
  }
}

const checkAdminRole=(req,res,next)=>{
if(req.session && req.session.user && req.session.user.roles==='admin')
{
  next();
}
else
{
  res.redirect('/');
}
}

const checkOwnerRole=(req,res,next)=>{
  if(req.session && req.session.user && req.session.user.roles==='owner')
  {
    next();
  }
  else
  {
    res.redirect('/');
  }
  }
  
  const checkTenantRole=(req,res,next)=>{
    if(req.session && req.session.user && req.session.user.roles==='user')
    {
      next();
    }
    else
    {
      res.redirect('/');
    }
    }


module.exports={sessionMiddleware,checkSession,checkAdminRole,checkOwnerRole,checkTenantRole,};
