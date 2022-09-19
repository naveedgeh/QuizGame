const express=require('express');
const {addQna,getQna,getQnaById,
    deleteQna,
    updateQna
}=require('../Controllers/QnA');
const route=express.Router();
route.get('/qna',getQna);
route.post('/addqns', addQna);
route.get('/qna/:id',getQnaById);
route.put('/qna/:id',updateQna);
route.delete("/qna/:id",deleteQna);
module.exports=route;