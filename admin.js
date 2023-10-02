const express=require('express')
const base=require('./db')
const dataBase = require('./db')

const adminRouter=express.Router()

adminRouter.get('',async(req,res)=>{
    console.log("Welcome The Admin to the dashboard")
})

adminRouter.get('/allmajorsalone',async(req,res)=>{
    const sql="select * from data_report_major_type"
    base.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({message:"No records available"})
            return
        }
        res.status(200).json(rows)
    })
})

adminRouter.get('/allsubs',async(req,res)=>{
    const sql="select * from data_report_sub_type"
    base.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({message:"No records available"})
            return
        }
        res.status(200).json(rows)
    })
})

adminRouter.get('/dptsubs/:dept',async(req,res)=>{
    const sql="select * from data_report_sub_type where report_dept=?"
    base.query(sql,[req.params.dept],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({message:"No records available"})
            return
        }
        res.status(200).json(rows)
    })
})

adminRouter.get('/majorsubs/:major',async(req,res)=>{
    const sql="select * from data_report_sub_type where report_major_id=?"
    base.query(sql,[req.params.major],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({message:"No records available"})
            return
        }
        res.status(200).json(rows)
    })
})

adminRouter.get('/substype/:sub',async(req,res)=>{
    const sql="select * from data_report_sub_type where report_sub_type=?"
    base.query(sql,[req.params.sub],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({message:"No records available"})
            return
        }
        res.status(200).json(rows)
    })
})

adminRouter.get('/subsecr',async(req,res)=>{
    const sql="select * from data_report_sub_type where report_major_id=1001"
    base.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({message:"No records available"})
            return
        }
        res.status(200).json(rows)
    })
})

adminRouter.get('/subsecr/:dept',async(req,res)=>{
    const sql="select * from data_report_sub_type where report_major_id=1001 and report_dept=?"
    base.query(sql,[req.params.dept],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({message:"No records available"})
            return
        }
        res.status(200).json(rows)
    })
})

adminRouter.get('/multi/:obj',async(req,res)=>{
    console.log(req.params.obj)
    let received=req.params.obj.split("-")
    console.log(received)
    dataBase.query("select * from data_report_sub_type where report_dept in(?)",[received],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({message:"No records matches"})
            return
        }
        res.status(200).json(rows)
    })

})

module.exports=adminRouter