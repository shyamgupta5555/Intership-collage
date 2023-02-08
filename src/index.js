const express=require("express");
const mongoose=require('mongoose');
const route=require("./routes/route")
mongoose.set('strictQuery', true);
const app=express();


app.use(express.json());

mongoose.connect("mongodb+srv://ashanur:nurasha2000@ashanurdb.x6brlcb.mongodb.net/group19Database")
.then(()=>{console.log("mongoDb is connected")})
.catch((err)=>{console.log(err.message)})

app.use("/",route)

app.listen(3000,(err)=>{
    if(err) return console.log(err.message)
    console.log("server is running on port : ", 3000)
})
