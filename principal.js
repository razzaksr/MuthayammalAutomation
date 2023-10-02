const express=require('express')

const principalRouter=express.Router()

principalRouter.get('',async(req,res)=>{
    console.log("Welcome The Principal to the dashboard")
})

module.exports=principalRouter