const express=require('express')
const route=express.Router()
const base=require('./db')
const cors=require('cors')

route.use(cors())

route.post('/login',async(req,res)=>{
    const{mail,pass}=req.body
    const sql="select * from data_faculties where email=? and password=?"
    base.query(sql,[mail,pass],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({error:"Invalid email/password"})
            return
        }
        res.status(200).json(rows[0])
    })
})

module.exports=route