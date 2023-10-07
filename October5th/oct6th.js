const express=require('express')
const route=express.Router()
const base=require('./db')

route.put('/acknowedgelevel2/:deptId/:wid',async(req,res)=>{
    const dId=req.params.deptId
    const wid=req.params.wid
    let sql="update data_ecr_workshop set report_lvl2=6000, eve_status=eve_status+1 where dept_id=? and workshop_id=?"
    base.query(sql,[dId,wid],(err,result)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(result.affectedRows==0){
            res.status(404).json({error:"Nothing has approved"})
            return
        }
        //res.status(200).json({message:`${wid} approved by principal`})
        sql="call GetNonNullColumnsForDeptId(?)"
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
            console.log(count)
            sql="update data_ecr_workshop set is_eve_completed=1 where workshop_id=? and eve_status=?"
            base.query(sql,[wid,count],(err,result)=>{
                if(err){
                    res.status(500).json({error:err.message})
                    return
                }
                if(result.affectedRows==0){
                    res.status(404).json({error:"Event can't approved"})
                    return
                }
                res.status(200).json({message:`Event Completed ${dId}`})
            })
        })
    })
})

route.get('/getacknowledgelevel2/:deptId',async(req,res)=>{
    const dId=req.params.deptId
    let sql="select workshop_id from data_ecr_workshop where eve_status=1 and is_eve_completed is null and dept_id=?"
    base.query(sql,[dId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No workshop to be approved"})
            return
        }
        res.status(200).json({row})
        // sql="call GetNonNullColumnsForDeptId(?)"
        // base.query(sql,[dId],(err,rows)=>{
        //     if(err){
        //         res.status(500).json({error:err.message})
        //         return
        //     }
        //     if(rows.length==0){
        //         res.status(404).json({error:"No records available to acknowledge"})
        //         return
        //     }
        //     console.log(rows[0])
        //     let count=rows.length
        //     console.log(count)
        // })
    })
})

route.put('/acknowledgelevel1/:deptId/:empId',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    let sql="select workshop_id from data_ecr_workshop where dept_id=? and eve_status=0 and is_eve_completed is null"
    base.query(sql,[dId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            console.log("selecting workshop")
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records available to acknowledge"})
            console.log("selecting workshop records")
            return
        }
        sql="call GetNonNullColumnsForDeptId(?)"
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
                sql="update data_ecr_workshop set report_lvl1=?, eve_status=eve_status+1 where dept_id=? and eve_status=0 and is_eve_completed is null"
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

// sql="update data_ecr_workshop set is_eve_completed=1 where dept_id=? and eve_status=?"
//                 base.query(sql,[dId,count],(err,result)=>{
//                     if(err){
//                         res.status(500).json({error:err.message})
//                         return
//                     }
//                     if(result.affectedRows==0){
//                         res.status(404).json({error:"Event hasn't completed yet"})
//                         return
//                     }
//                     res.status(200).json({message:`Event Completed ${dId}`})
//                 })

route.get('/waitlevel1',async(req,res)=>{
    let sql="select workshop_id from data_ecr_workshop where dept_id=1 and eve_status=0"
    base.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({error:"No workshop matches"})
            return
        }
        res.status(200).json(rows)
    })
})

// check the authority approvals in each level
route.get('/authorities/:id',async(req,res)=>{
    const id=req.params.id
    // const sql="SELECT dept_id, 'report_lvl1' AS column_name, report_lvl1 AS column_value FROM data_approvals WHERE dept_id = 1 AND report_lvl1 IS NOT NULL UNION ALL SELECT dept_id, 'report_lvl2' AS column_name, report_lvl2 AS column_value FROM data_approvals WHERE dept_id = 1 AND report_lvl2 IS NOT NULL UNION ALL SELECT dept_id, 'report_lvl3' AS column_name, report_lvl3 AS column_value FROM data_approvals WHERE dept_id = 1 AND report_lvl3 IS NOT NULL UNION ALL SELECT dept_id, 'report_lvl4' AS column_name, report_lvl4 AS column_value FROM data_approvals WHERE dept_id = 1 AND report_lvl4 IS NOT NULL UNION ALL SELECT dept_id, 'report_lvl5' AS column_name, report_lvl5 AS column_value FROM data_approvals WHERE dept_id = 1 AND report_lvl5 IS NOT NULL"
    const sql="call GetNonNullColumnsForDeptId(?)"
    base.query(sql,[id],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({message:"No ECR Workshop mathced"})
            return
        }
        //res.status(200).json({row})
        let count=0
        let obj={}
        for (let index = 0; index < row[0].length; index++) {
            //if(row[0][index].column_value.includes(eid)){
                console.log(row[0][index].column_name+" "+row[0][index].column_value)
                let key=row[0][index].column_name
                let value=row[0][index].column_value
                obj[key]=value
                count++;
            //}
        }
        obj['dept_id']=id
        console.log(obj+" "+count)
        res.status(200).json({obj})
    })
})


route.get('/authoritiesofemp/:id/:empId',async(req,res)=>{
    const id=req.params.id
    const eid=req.params.empId
    // const sql="SELECT dept_id, 'report_lvl1' AS column_name, report_lvl1 AS column_value FROM data_approvals WHERE dept_id = 1 AND report_lvl1 IS NOT NULL UNION ALL SELECT dept_id, 'report_lvl2' AS column_name, report_lvl2 AS column_value FROM data_approvals WHERE dept_id = 1 AND report_lvl2 IS NOT NULL UNION ALL SELECT dept_id, 'report_lvl3' AS column_name, report_lvl3 AS column_value FROM data_approvals WHERE dept_id = 1 AND report_lvl3 IS NOT NULL UNION ALL SELECT dept_id, 'report_lvl4' AS column_name, report_lvl4 AS column_value FROM data_approvals WHERE dept_id = 1 AND report_lvl4 IS NOT NULL UNION ALL SELECT dept_id, 'report_lvl5' AS column_name, report_lvl5 AS column_value FROM data_approvals WHERE dept_id = 1 AND report_lvl5 IS NOT NULL"
    const sql="call GetNonNullColumnsForDeptId(?)"
    base.query(sql,[id],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({message:"No ECR Workshop mathced"})
            return
        }
        let obj={}
        for (let index = 0; index < row[0].length; index++) {
            if(row[0][index].column_value.includes(eid)){
                console.log(row[0][index].column_name+" "+row[0][index].column_value)
                let key=row[0][index].column_name
                let value=row[0][index].column_value
                obj[key]=value
            }
        }
        obj['dept_id']=id
        console.log(obj)
        res.status(200).json({obj})
    })
})


route.put('/updateauthoritiesofemp/:id/:empId',async(req,res)=>{
    const id=req.params.id
    const eid=req.params.empId
    // const sql="SELECT dept_id, 'report_lvl1' AS column_name, report_lvl1 AS column_value FROM data_approvals WHERE dept_id = 1 AND report_lvl1 IS NOT NULL UNION ALL SELECT dept_id, 'report_lvl2' AS column_name, report_lvl2 AS column_value FROM data_approvals WHERE dept_id = 1 AND report_lvl2 IS NOT NULL UNION ALL SELECT dept_id, 'report_lvl3' AS column_name, report_lvl3 AS column_value FROM data_approvals WHERE dept_id = 1 AND report_lvl3 IS NOT NULL UNION ALL SELECT dept_id, 'report_lvl4' AS column_name, report_lvl4 AS column_value FROM data_approvals WHERE dept_id = 1 AND report_lvl4 IS NOT NULL UNION ALL SELECT dept_id, 'report_lvl5' AS column_name, report_lvl5 AS column_value FROM data_approvals WHERE dept_id = 1 AND report_lvl5 IS NOT NULL"
    const sql="call GetNonNullColumnsForDeptId(?)"
    base.query(sql,[id],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({message:"No ECR Workshop mathced"})
            return
        }
        let obj={}
        for (let index = 0; index < row[0].length; index++) {
            if(row[0][index].column_value.includes(eid)){
                console.log(row[0][index].column_name+" "+row[0][index].column_value)
                let key=row[0][index].column_name
                let value=row[0][index].column_value
                obj[key]=value
            }
        }
        console.log(obj)
        // res.status(200).json({row})
        const sql="update data_ecr_workshop set ? = ? where dept_id=?"
        base.query(sql,[])
    })
})

module.exports=route