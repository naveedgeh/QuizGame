const Category=require('../Models/Category');
exports.getCategory=async(req,res)=>{
    const category=await Category.find({});
    if(category.length==0){
       return res.status(401).json({status:401,message:"Data is not found"});
    }
    category.map((c)=>c.categoryImage=
    `http://${process.env.HOST_NAME}:${process.env.PORT}/uploads/Category/${c.categoryImage}`);
    return res.status(200).json({status:200,data:{category}});
}
exports.createCategory=async(req,res)=>{
    const categoryObject=new Category({
        categoryName:req.body.categoryName,
        categoryImage:req.file.originalname
    });
    const category=await categoryObject.save();
    if(category){
        return res.status(201)
            .json({message: "Successfully Created",
            status: 201})
    }
}
exports.getCategoryById=(req,res)=>{
        
}
exports.deleteCategory=async(req,res)=>{

}
exports.updateCategory=async(req,res)=>{
    
}