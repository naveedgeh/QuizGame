const express=require('express');
const {getCategory,createCategory,
    getCategoryById,
    deleteCategory,
    updateCategory
}=require('../Controllers/Category');
const multer  = require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/Category');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});
const upload = multer({ storage: storage });
const route=express.Router();
route.get('/category',getCategory);
route.post('/category-create',upload.single("categoryImage"), createCategory);
route.get('category/:id',getCategoryById);
route.put('category/:id',updateCategory);
route.delete("category:id",deleteCategory);
module.exports=route;