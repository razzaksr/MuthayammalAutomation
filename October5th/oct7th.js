const express=require('express')
const route=express.Router()
const base=require('./db')
const cors=require('cors')

route.use(cors())
//  next update report_lvl1 by given emp_id where eve_status=0 and worshop_id = given one and make sure to find the total authorisation which refers acknowedgelevel2/:deptId/:wid


route.get('/loadforlevel1/:deptId/:empId',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    let sql="select report_lvl1 from data_approvals where dept_id=? and report_lvl1 like ?"
    base.query(sql,[dId,'%'+eId+'%'],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No matches"})
            return
        }
        sql="select workshop_id,workshop_name from data_ecr_workshop where eve_status=0 and report_lvl1 is null and is_eve_completed is null and dept_id=?"
        base.query(sql,[dId],(err,rows)=>{
            if(err){res.status(500).json({error:err.message});return;}
            if(row.length==0){res.status(404).json({error:"Nothing to show"})}
            res.status(200).json({rows})
        })
    })
    //const sql="select workshop_id,workshop_name from data_ecr_workshop where eve_status=0 and report_lvl1 is null and is_eve_completed is null and dept_id=?"
})

route.get('/find/:deptId',async(req,res)=>{
    const dId=req.params.deptId
    const sql="select faculty_id from data_faculties where faculty_dept=? and not faculty_desig in(403,404)"
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({error:"No faculties"})
            return
        }
        res.status(200).json({rows})
    })
})

module.exports=route