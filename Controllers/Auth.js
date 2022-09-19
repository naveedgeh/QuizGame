const User=require('../Models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
exports.Login=(req,res)=>{
    return res.send("login");
}
exports.singUp=async(req,res)=>{
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordhash = bcrypt.hashSync(req.body.password, salt);
    const userObject=new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        instaUserName:req.body.instaUserName,
        email:req.body.email,
        password:passwordhash,
        profileImage:req.file.originalname
    });
    const user=await userObject.save();
    if(user){
        return res.status(201)
            .json({message: "Successfully Registered",
            status: 201})
    }
}
exports.Login= async(req,res)=>{
        const {username,password}=req.body;
        const user=await User.findOne({email:username});
        if(!user){
           return res.status(401).json({message:"Email not found"});
        }
        const match =bcrypt.compare(password,user.password);
        if(!match){
            return res.status(401).json({message:"Password is not correct"});
        }
         if(user){
           const privtateKey=process.env.PRIVATE_KEY;
           const token = jwt.sign({ id:user._id,email: user.email },privtateKey);
            return res.status(200).json({
                message:"Successfuly Login",
                stutus:200,
                data:{
                    firstName:user.firstName,
                    lastName:user.lastName,
                    email:user.email,
                    instaUserName:user.instaUserName,
                    profileImage:`http://${process.env.HOST_NAME}:${process.env.PORT}/uploads/${user.profileImage}`
                },
                token
            });
        }
}