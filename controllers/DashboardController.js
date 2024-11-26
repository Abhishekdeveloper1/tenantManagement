const dashboard=(req,res)=>{

    res.render('templates/users/dashboard', { title: 'dashboard' });
}


module.exports={dashboard}