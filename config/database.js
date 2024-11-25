const mongoose=require('mongoose');

const dbConnect=async()=>{
try{
    mongoose.connect("mongodb://localhost:27017/tenant25112024_01");
    console.log('connection is successful');
}
catch(error)
{
    console.log('Database connection failed:',error);
}
}

module.exports=dbConnect;