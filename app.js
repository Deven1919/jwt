const express= require('express')
const app= express();
const port= 3004;
//require("dotenv").config();
const jwt= require('jsonwebtoken')
app.use(express.json())
app.get('/post',(req,res)=>{
res.json({
    success:1,
    message:"this api is working properly"
});

}); 
 app.post('/post/login',function(req,res){
    const user= {id:2}
    const token=jwt.sign({user},'my_secret_key');
    res.json({token: token})
     });

 app.get('/post/protected',ensureToken,function(req,res){
  jwt.verify(req.token,'my_secret_key',function(err,data){

    if(err)
    {
     res.sendStatus(403)
    } else {
        res.send({
            text:"THIS FILE IS PROTECTED",
            data:data
    });
    }
}) 

})


 function ensureToken(req,res,next){
        const bearerHeader= req.headers["authorization"]
        if(bearerHeader !=='undefined'){
            // const bearer= bearerHeader.split("");
            // const bearerToken=bearer[1];
            req.token=bearerHeader;
            next();
        } else{
            res.sendStatus(403);
        }
   
 }

//const postRouter= require('./Router/route')
//app.use('/post',postRouter)
app.listen(port,(req,res)=>{
    console.log(`Connected!${port}`)
});

