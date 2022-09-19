const mongoose=require('mongoose');

const QnASchema=new mongoose.Schema({
    qustion:{type:String},
    options:[String],
    quize:new mongoose.Schema({
        title:{type:String},
        time:{type:String} 
    }),
    answer:{type:String}
},{timestamps:true});

const QnA=mongoose.model('QnA',QnASchema);
module.exports=QnA;