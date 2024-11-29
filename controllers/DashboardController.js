const dashboard=(req,res)=>{
    res.render('templates/users/dashboard', { title: 'dashboard',user: req.session.user });
}

const packagelist=(req,res)=>{
    res.render('templates/users/subpackage');
}
// const package={req,res}=>{
//     res.render('templates/users/subpackage');
// }


module.exports={dashboard,packagelist,}