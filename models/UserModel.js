const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema=({
    username: {
        type: String,
        required: true,
      },
      email:{
        type:String,
        required:true,
        unique:true,
      },
      password:{
        type:String,
        required:true,
      },
      roles: {
        type: [String],
        default: ['user'],
      },
      createdAt:
      {
        type:Date,
        default:Date.now,
      },
});
module.exports=mongoose.model('User',userSchema);