const express=require('express')

const hodRouter=express.Router()

hodRouter.get('',async(req,res)=>{
    console.log("Welcome HOD to the dashboard")
})

module.exports=hodRouter