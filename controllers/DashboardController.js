const dashboard=(req,res)=>{
    res.render('templates/users/dashboard', { title: 'dashboard',user: req.session.user });
}


module.exports={dashboard}