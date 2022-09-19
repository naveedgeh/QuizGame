const mongoose=require('mongoose');

const QuizeSchema=new mongoose.Schema({
    title:{type:String},
    category:new mongoose.Schema({
        name:{type:String},
        image:{type:String}
    }),
    image:{type:String},
    time:{type:String}  
},{timestamps:true});

const Quize=mongoose.model("Quize",QuizeSchema);

module.exports=Quize;