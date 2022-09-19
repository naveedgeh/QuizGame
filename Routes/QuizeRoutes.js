const express=require('express');
const {addQuize,getQuize,
    getQuizeById,deleteQuize,
    updateQuize
}=require('../Controllers/Quize');
const uploadImage=require('../Middleware/uploadImage');
const multer  = require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/Quize');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});
const upload = multer({ storage: storage });
const route=express.Router();
route.get('/quize',getQuize);
route.post('/addquize',upload.single('imageurl'), addQuize);
route.get("/quize/:id",getQuizeById);
route.put("/quize/:id",updateQuize);
route.delete("/quize/:id",deleteQuize);
module.exports=route;