const express=require('express')
const router=express.Router()
const cors=require('cors')
const base=require('./db')

router.use(cors())

router.get('/find/:deptId',async(req,res)=>{
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

router.post('/propose',async(req,res)=>{
    const{seminar_name,dept_id,proposed_by}=req.body
    const sql="insert into data_ecr_seminar(seminar_name,dept_id,eve_proposed_by) values(?,?,?)"
    base.query(sql,[seminar_name,dept_id,proposed_by],(err,ack)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(ack.affectedRows==0){
            res.status(404).json({error:"Seminar couldn't added"})
            return
        }
        res.status(200).json({message:`Seminar addded and id is ${ack.insertId}`})
    })
})

router.get('/loadforlevel1/:deptId/:empId',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    let sql="select report_lvl1 from data_approvals where dept_id=? and report_lvl1 like ? and subtype_id=1902"
    base.query(sql,[dId,'%'+eId+'%'],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No matches"})
            return
        }
        sql="select seminar_id,seminar_name,eve_proposed_by from data_ecr_seminar where eve_status=0 and report_lvl1 is null and is_eve_completed is null and dept_id=?"
        base.query(sql,[dId],(err,rows)=>{
            if(err){res.status(500).json({error:err.message});return;}
            if(row.length==0){res.status(404).json({error:"Nothing to show"})}
            res.status(200).json({rows})
        })
    })
})

router.put('/acknowledgelevel1/:deptId/:empId',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    let sql="select seminar_id from data_ecr_seminar where dept_id=? and eve_status=0 and is_eve_completed is null"
    base.query(sql,[dId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records available to acknowledge"})
            return
        }
        sql="call GetNonNullColumnsForSeminarDeptId(?)"
        base.query(sql,[dId],(err,rows)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(rows.length==0){
                res.status(404).json({error:"No records available to acknowledge"})
                return
            }
            console.log(rows[0])
            let count=rows.length
            // for (let index = 0; index < rows.length; index++) 
            // {count++;}
            console.log(count)
            //
            if(rows[0][0].column_value.includes(eId)){
                sql="update data_ecr_seminar set report_lvl1=?, eve_status=eve_status+1 where dept_id=? and eve_status=0 and is_eve_completed is null"
                base.query(sql,[eId,dId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })
            }
            else{
                res.status(404).json({error:"Forbidden access"})
            }
        })
    })
})

module.exports=router