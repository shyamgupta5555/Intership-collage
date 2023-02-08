const mongoose=require("mongoose")

const internSchema=new mongoose.Schema({
    
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true,valid:true},
    mobile:{type:Number,required:true,unique:true},
    collegeId:{type:mongoose.Schema.Types.ObjectId,ref:"college"},
    isDeleted:{type:Boolean,default:false}
})

module.exports=mongoose.model("intern",internSchema)