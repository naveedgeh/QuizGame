const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    instaUserName:{type:String},
    email:{type:String},
    password:{type:String},
    phoneNumber:{type:String},
    profileImage:{type:String},
    dzcoinPoint:{type:Number},
    
},{timestamps:true});
  const User=mongoose.model("User",UserSchema);
  module.exports=User;
