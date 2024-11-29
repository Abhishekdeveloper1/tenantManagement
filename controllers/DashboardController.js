const SubscriptionplansModel =require("../models/SubscriptionplansModel");
const dashboard=(req,res)=>{
    res.render('templates/users/dashboard', { title: 'dashboard',user: req.session.user });
}

const packagelist=(req,res)=>{
    res.render('templates/users/subpackage');
}

const subscriptionplan=(req,res)=>{
    res.render('templates/users/subscriptionplan');
}

const addSubscriptionPlan=async(req,res)=>{
try {
    const { planName, price, duration, features } = req.body;
  // Create a new subscription plan document
  const newPlan = new SubscriptionplansModel({
    planName,
    price,
    duration,
    features,
  });
  await newPlan.save();
  res.redirect('/subscription-list'); // or wherever you want to redirect

} catch (error) {
    console.error("Error saving subscription plan:", error);
    res.status(500).send("Internal Server Error");
    
}

}

const subscriptionplanlist=async(req,res)=>{
const planLists=await SubscriptionplansModel.find({});

console.log(planLists);
    res.render('templates/users/subscriptionplanlist',{planLists});
}
module.exports={dashboard,packagelist,subscriptionplan,addSubscriptionPlan,subscriptionplanlist,}