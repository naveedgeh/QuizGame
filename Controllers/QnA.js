const QnA=require('../Models/QnA');
const Quize=require('../Models/Quize');
exports.addQna=async(req,res)=>{
   const quizeObject=await Quize.findById(req.body.quize);
   if(!quizeObject){
    return res.status(400).json({message:"invalid quize"});
   }
   const QnAObject=new QnA({
    qustion:req.body.question,
    options:req.body.options,
    quize:{
        _id:quizeObject._id,
        title:quizeObject.title,
        time:quizeObject.time
    },
    answer:req.body.answer
   });
   const qna=await QnAObject.save();
   if(!qna){
        res.status(401).json({message:"please contact with developer",status:401});
   }
   res.status(200).json({message:"success",status:200,data:{qna}});
}
exports.getQna=async(req,res)=>{
  const qna=await  QnA.aggregate([ { $sample: { size: 4} } ]);
  if(qna.length!=0){
    return res.status(200).json({message:"success",data:qna,status:200,totalQuestion:qna.length});
  }
  return res.status(401).json({message:"Data not found",status:401})
}
exports.getQnaById=(req,res)=>{
        
}
exports.deleteQna=async(req,res)=>{

}
exports.updateQna=async(req,res)=>{
    
}