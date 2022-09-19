const express=require('express');
const {getSlider,CreateSlider,
    getSliderById,deleteSlider,
    updateSlider}=require('../Controllers/Slider');
const multer  = require('multer');
const { deleteCategory } = require('../Controllers/Category');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/slider')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});
const upload = multer({ storage: storage });
const route=express.Router();
route.get('/slider',getSlider);
route.post('/slider-create',upload.single("sliderImage"), CreateSlider);
route.get('slider/:id',getSliderById);
route.delete("slider/:id",deleteSlider);
route.put("slider/:id",updateSlider);
module.exports=route;