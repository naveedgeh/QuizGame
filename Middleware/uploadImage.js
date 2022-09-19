const mime=require('mime');
const fs=require('fs');
const uploadImage=(req,res,next)=>{
    try {
      let matches=req.body.imageurl.match(/^data:([A-Za-z.+\/]+);base64,(.*)$/);
       let response={};
        if(matches.length!==3){
            return new Error('Invalid input string');
        }
        response.type=matches[1];
        response.data=Buffer.from(matches[2],"base64");
        let decodedImg=response;
        let imageBuffer=decodedImg.data;
        let type=decodedImg.type;
        let extension=mime.getExtension(type);
        let fileName=Date.now()+"."+extension;
        fs.writeFileSync(`${__dirname}/../uploads/Quize/`+fileName,imageBuffer);
        req.body.imageurl=fileName;
       next();
    } catch (error) {
      //  console.log("sorry somting is wrong");
        next(error)
    }
}

module.exports=uploadImage;