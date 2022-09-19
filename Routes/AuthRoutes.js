const express=require('express');
const {Login,singUp}=require('../Controllers/Auth');
const multer  = require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/UserProfile')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});
const upload = multer({ storage: storage });
const route=express.Router();
route.post('/login',Login);
route.post('/singup',upload.single("profileImage"), singUp);
module.exports=route;