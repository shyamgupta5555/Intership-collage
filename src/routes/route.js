
const express=require("express")
const router=express.Router()
const collegeController=require("../controller/collegeController")

router.post("/functionup/colleges",collegeController.collegeCreate)
router.post("/functionup/interns",collegeController.interCreate)
router.get("/functionup/collegeDetails",collegeController.getCollege)


router.all('*/',(req ,res)=>{
    res.status(400).send({status: false , message :" path invalid"})
  })
  
module.exports=router