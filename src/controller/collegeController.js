const { find } = require("../model/collegeModel")
const collegeModel=require("../model/collegeModel")
const internsModel=require("../model/internModel")
const  axios = require('axios')

let nameRegex = /^[A-Za-z, ]{3,50}$/
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
let mobileRegex= /^([+]\d{2}[ ])?\d{10}$/

exports.collegeCreate=async function(req,res){
   try{

    let data=req.body
    const {name,fullName,logoLink} =data
    if(Object.keys(data).length == 0)return res.status(400).send({status : false , message :"body empty"})
    if(!name) return res.status(400).send({status:false,message:"name is required"})
    if(!fullName) return res.status(400).send({status:false,message:"full name is required"})
    if(!logoLink) return res.status(400).send({status:false,message:"logo link is required"})

    let linkIsCorrect
    await axios.get(logoLink)
      .then((res) => { linkIsCorrect = true })
      .catch((error) => { linkIsCorrect = false })
    if (linkIsCorrect === false) return res.status(400).send({ status: false, message: "Please provide valid logoLink" })

    if(!name.match(nameRegex)) return res.status(400).send({status:false,message:"invalid name"})
    if(!fullName.match(nameRegex)) return res.status(400).send({status:false,message:"full name invalid"})

    let college=await collegeModel.findOne({name:name})
    if(college) return res.status(400).send({status:false,message:"this college name already exists"})
    let create=await collegeModel.create(data)
    res.status(201).send({status:true,data:create})

}catch(error){
    res.status(500).send({error:error.message})
}}


exports.interCreate=async function(req,res){
   try{
    let data=req.body
    const {name,email,mobile,collegeName}=data
    if(Object.keys(data).length == 0)return res.status(400).send({status : false , message :"body empty"})
    if(!name) return res.status(400).send({status:false,message:"name is required"})
    if(!email) return res.status(400).send({status:false,message:"email is required"})
    if(!mobile) return res.status(400).send({status:false,message:"mobile is required"})
    if(!collegeName) return res.status(400).send({status:false,message:"collegeName is required"})

    if(!name.match(nameRegex)) return res.status(400).send({status:false,msg:"plz. give valid name"})
    if(!email.match(emailRegex)) return res.status(400).send({status:false,message:"email should be valid"})
    if(!mobileRegex.test(mobile)) return res.status(400).send({status:false,msg:"mobile number invalid"})
    
    let emailCheck= await internsModel.findOne({email :email})
    if(emailCheck) return res.status(400).send({status :false , message : "email id already exist"})

    let mobileCheck= await internsModel.findOne({mobile:mobile})
    if(mobileCheck) return res.status(400).send({status :false , message : "mobile already exist"})
   
    let getCollege=await collegeModel.findOne({name:collegeName ,isDeleted : false})
    if(!getCollege) return res.status(404).send({status:false,message:"college does not exist"})

    let obj={name:name,email:email,mobile:mobile,collegeId:getCollege._id}
    let createdData=await internsModel.create(obj)
    res.status(201).send({status:true,data:createdData})

}catch(error){
    res.status(500).send({error:error.message})
}}


exports.getCollege=async (req,res)=>{
    try{     
   let data=req.query.collegeName
   if(!data) return res.status(400).send({status:false,msg:"please provide collegeName"})
   const newData=await collegeModel.findOne({name:data,isDeleted :false})
   if(!newData) return res.status(404).send({status:false,message:"college not found"})
   let findInterns=await internsModel.find({collegeId:newData._id.toString(),isDeleted : false}).select({collegeId:0 ,isDeleted :0,__v:0})
   if(findInterns.length == 0){ findInterns = "no intens "}
   let newObj={name:newData.name,fullName:newData.fullName,logoLink:newData.logoLink,interns:findInterns}
   res.status(200).send({status:true,data:newObj})

}catch(err){
    res.status(500).send({status: false ,errName : err.name, message : err.message})
}
}






