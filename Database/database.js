const mongoose=require('mongoose');
    const url=process.env.DATABASE_URL;
    const port=process.env.DATABASE_PORT;
    mongoose.connect(`mongodb://${url}:${port}/quizdb`)
    .then(()=>{
        console.log("database is conneted");
    })
    .catch((error)=>{
        console.error(error);
});
module.exports = mongoose;
