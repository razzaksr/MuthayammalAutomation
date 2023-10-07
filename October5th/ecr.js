const express=require('express')
const route=express.Router()
const base=require('./db')
const cors=require('cors')

route.use(cors())

// proposing an workshop event either by assistance professor or faculty coordinator
// alternate
route.post('/proposal',async(req,res)=>{
    // receive the request from client
    const{workshop_name,dept_id,proposal_by}=req.body

    sql="insert into data_ecr_workshop(workshop_name,dept_id,eve_proposed_by) values(?,?,?)"
        base.query(sql,[workshop_name,dept_id,proposal_by],(err,ack)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            res.status(200).json({message:"Wokshop Proposal has sent",id:ack.insertId})
        })
})

//alternate
// route.get('/yetbyeverylevel/:empid',async(req,res)=>{
//     const id=req.params.empid
//     let found=new Array()
//     // let sql="select * from data_approvals where report_lvl1 like ? or report_lvl2 like ? or report_lvl3 like ? or report_lvl4 like ? or report_lvl5 like ?"
//     // let sql = "select report_lvl1 as column_name from data_approvals where report_lvl1 like ? and subtype_id=1901 union select report_lvl2 as column_name from data_approvals where report_lvl2 like ? and subtype_id=1901 union select report_lvl3 as column_name from data_approvals where report_lvl3 like ? and subtype_id=1901 union select report_lvl4 as column_name from data_approvals where report_lvl4 like ? and subtype_id=1901 union select report_lvl5 as column_name from data_approvals where report_lvl5 like ? and subtype_id=1901"
//     base.query(sql,['%'+id+'%','%'+id+'%','%'+id+'%','%'+id+'%','%'+id+'%'],(err,rows)=>{
//         if(err){
//             res.status(500).json({error:err.message})
//             return
//         }
//         if(rows.length==0){
//             res.status(404).json({message:"No ECR Workshop mathced"})
//             return
//         }
//         res.status(200).json({rows})
//     })
//     // let sql="select * from data_ecr_workshop where is_eve_completed is null and report_lvl1 like ? or report_lvl2 like ? or report_lvl3 like ? or report_lvl4 like ? or report_lvl5 like ?"
//     // base.query(sql,['%'+id+'%','%'+id+'%','%'+id+'%','%'+id+'%','%'+id+'%'],(err,rows)=>{
//     //     if(err){
//     //         res.status(500).json({error:err.message})
//     //         return
//     //     }
//     //     if(rows.length==0){
//     //         res.status(404).json({message:"No ECR Workshop mathced"})
//     //         return
//     //     }
//     //     rows.map((row)=>{
//     //         //console.log(JSON.stringify(row.report_lvl1).includes(id))
//     //         if(row['report_lvl1'].includes(id)){
//     //             found.push("report_lvl1")
//     //             // console.log("Found @ report_lvl1")
//     //         }
//     //         if(row['report_lvl2'].includes(id)){
//     //             found.push("report_lvl2")
//     //             // console.log("Found @ report_lvl2")
//     //         }
//     //         if(row['report_lvl3']!=null&&row['report_lvl3'].includes(id)){
//     //             found.push("report_lvl3")
//     //             // console.log("Found @ report_lvl3")
//     //         }
//     //         if(row['report_lvl4']!=null&&row['report_lvl4'].includes(id)){
//     //             found.push("report_lvl4")
//     //             // console.log("Found @ report_lvl4")
//     //         }
//     //         if(row['report_lvl5']!=null&&row['report_lvl5'].includes(id)){
//     //             found.push("report_lvl5")
//     //             // console.log("Found @ report_lvl5")
//     //         }
//     //     })
//     //     console.log(found)
//     //     res.status(200).json({rows})
//     // })
// })

// route.post('/proposal',async(req,res)=>{
//     // receive the request from client
//     const{workshop_name,dept_id,proposal_by}=req.body

//     let approvals;

//     // fetch authorities from master table data_approvals
//     let sql="select * from data_approvals where dept_id=? and subtype_id=1901"
//     base.query(sql,[dept_id],(err,row)=>{
//         if(err){
//             res.status(500).json({error:err.message})
//             return
//         }
//         if(row.length==0){
//             res.status(404).json({message:"No authorities matches for the workshop"})
//             return
//         }
//         approvals=row[0]
//         //console.log(approvals)

//         // insert new ecr entry in data_ecr_workshop with deault and user defined values
//         sql="insert into data_ecr_workshop(workshop_name,report_lvl1,report_lvl2,report_lvl3,report_lvl4,report_lvl5,dept_id,eve_proposed_by) values(?,?,?,?,?,?,?,?)"
//         base.query(sql,[workshop_name,approvals.report_lvl1,approvals.report_lvl2,approvals.report_lvl3,approvals.report_lvl4,approvals.report_lvl5,dept_id,proposal_by],(err,ack)=>{
//             if(err){
//                 res.status(500).json({error:err.message})
//                 return
//             }
//             res.status(200).json({message:"Wokshop Proposal has sent",id:ack.insertId})
//         })
//     })
// })

// check the authority approvals in each level
route.get('/authorities/:id',async(req,res)=>{
    const id=req.params.id
    const sql="select report_lvl1,report_lvl2,report_lvl3,report_lvl4,report_lvl5 from data_ecr_workshop where workshop_id=?"
    base.query(sql,[id],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({message:"No ECR Workshop mathced"})
            return
        }
        res.status(200).json({row})
    })
})

// find proposals those waiting for level1 approvals by giving employee id
route.get('/yetbylevel1/:empid',async(req,res)=>{
    const id=req.params.empid
    let sql="select * from data_ecr_workshop where is_eve_completed is null and report_lvl1 like ?"
    base.query(sql,['%'+id+'%'],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({message:"No ECR Workshop mathced"})
            return
        }
        res.status(200).json({rows})
    })
})

// approve all proposals those in level1 approvals by giving employee id
route.put('/approveallbylevel1/:empid',async(req,res)=>{
    const id=req.params.empid
    let sql="update data_ecr_workshop set report_lvl1=?, eve_status=1 where is_eve_completed is null and report_lvl1 like ?"
    base.query(sql,[id,'%'+id+'%'],(err,ack)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        res.status(200).json({message:`Approved level ${id}`})
    })
})

// approve proposals those in level1 approvals by giving employee id and event id
route.put('/approvebylevel1/:wid/:empid',async(req,res)=>{
    const id=req.params.empid
    const wid=req.params.wid
    let sql="update data_ecr_workshop set report_lvl1=?, eve_status=1 where is_eve_completed is null and report_lvl1 like ? and workshop_id=?"
    base.query(sql,[id,'%'+id+'%',wid],(err,ack)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        res.status(200).json({message:`Approved level ${id}`})
    })
})

// approve level2 by principal
// route.put('/approvebylevel2/:wid',async(req,res)=>{
//     const wid=req.params.wid
//     let sql="update data_ecr_workshop set report_lvl2=6000, eve_status=2 where is_eve_completed is null and report_lvl2 like ? and workshop_id=?"
//     base.query(sql,['%'+6000+'%',wid],(err,ack)=>{
//         if(err){
//             res.status(500).json({error:err.message})
//             return
//         }
//         res.status(200).json({message:`Approved leve2 Principal`})
//     })
// })


// find approval level where the gicen employee id is part of it
// route.get('/yetbyeverylevel/:empid',async(req,res)=>{
//     const id=req.params.empid
//     let found=new Array()
//     let sql="select * from data_ecr_workshop where is_eve_completed is null and report_lvl1 like ? or report_lvl2 like ? or report_lvl3 like ? or report_lvl4 like ? or report_lvl5 like ?"
//     base.query(sql,['%'+id+'%','%'+id+'%','%'+id+'%','%'+id+'%','%'+id+'%'],(err,rows)=>{
//         if(err){
//             res.status(500).json({error:err.message})
//             return
//         }
//         if(rows.length==0){
//             res.status(404).json({message:"No ECR Workshop mathced"})
//             return
//         }
//         rows.map((row)=>{
//             //console.log(JSON.stringify(row.report_lvl1).includes(id))
//             if(row['report_lvl1'].includes(id)){
//                 found.push("report_lvl1")
//                 // console.log("Found @ report_lvl1")
//             }
//             if(row['report_lvl2'].includes(id)){
//                 found.push("report_lvl2")
//                 // console.log("Found @ report_lvl2")
//             }
//             if(row['report_lvl3']!=null&&row['report_lvl3'].includes(id)){
//                 found.push("report_lvl3")
//                 // console.log("Found @ report_lvl3")
//             }
//             if(row['report_lvl4']!=null&&row['report_lvl4'].includes(id)){
//                 found.push("report_lvl4")
//                 // console.log("Found @ report_lvl4")
//             }
//             if(row['report_lvl5']!=null&&row['report_lvl5'].includes(id)){
//                 found.push("report_lvl5")
//                 // console.log("Found @ report_lvl5")
//             }
//         })
//         console.log(found)
//         res.status(200).json({rows})
//     })
// })

//alternate
// route.get('/waitingfor/:empid/:dept',async(req,res)=>{
//     const id=req.params.empid
//     let found=new Array()
//     base.query("select workshop_id from data_ecr_workshop where dept_id=?",[req.params.dept],(err,row)=>{
//         found=row
//         res.status(200).json({message:row})
//     })
//     // let sql="select * from data_ecr_workshop where is_eve_completed is null and report_lvl1 like ? or report_lvl2 like ? or report_lvl3 like ? or report_lvl4 like ? or report_lvl5 like ?"
//     // base.query(sql,['%'+id+'%','%'+id+'%','%'+id+'%','%'+id+'%','%'+id+'%'],(err,rows)=>{
//     //     if(err){
//     //         res.status(500).json({error:err.message})
//     //         return
//     //     }
//     //     if(rows.length==0){
//     //         res.status(404).json({message:"No ECR Workshop mathced"})
//     //         return
//     //     }
//     //     rows.map((row)=>{
//     //         //console.log(JSON.stringify(row.report_lvl1).includes(id))
//     //         if(row['report_lvl1'].includes(id)){
//     //             found.push("report_lvl1")
//     //             // console.log("Found @ report_lvl1")
//     //         }
//     //         if(row['report_lvl2'].includes(id)){
//     //             found.push("report_lvl2")
//     //             // console.log("Found @ report_lvl2")
//     //         }
//     //         if(row['report_lvl3']!=null&&row['report_lvl3'].includes(id)){
//     //             found.push("report_lvl3")
//     //             // console.log("Found @ report_lvl3")
//     //         }
//     //         if(row['report_lvl4']!=null&&row['report_lvl4'].includes(id)){
//     //             found.push("report_lvl4")
//     //             // console.log("Found @ report_lvl4")
//     //         }
//     //         if(row['report_lvl5']!=null&&row['report_lvl5'].includes(id)){
//     //             found.push("report_lvl5")
//     //             // console.log("Found @ report_lvl5")
//     //         }
//     //     })
//     //     console.log(found)
//     //     res.status(200).json({rows})
//     // })
// })

// update approval level where the gicen employee id is part of it
route.put('/approvebyeverylevel/:empid',async(req,res)=>{
    const id=req.params.empid
    let found=new Array()
    let sql="select workshop_id from data_ecr_workshop where is_eve_completed is null and report_lvl1 like ? or report_lvl2 like ? or report_lvl3 like ? or report_lvl4 like ? or report_lvl5 like ?"
    base.query(sql,['%'+id+'%','%'+id+'%','%'+id+'%','%'+id+'%','%'+id+'%'],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({message:"No ECR Workshop mathced"})
            return
        }
        found=rows
        // rows.map((row)=>{
        //     //console.log(JSON.stringify(row.report_lvl1).includes(id))
        //     if(row['report_lvl1'].includes(id)){
        //         found.push("report_lvl1")
        //         // console.log("Found @ report_lvl1")
        //     }
        //     if(row['report_lvl2'].includes(id)){
        //         found.push("report_lvl2")
        //         // console.log("Found @ report_lvl2")
        //     }
        //     if(row['report_lvl3']!=null&&row['report_lvl3'].includes(id)){
        //         found.push("report_lvl3")
        //         // console.log("Found @ report_lvl3")
        //     }
        //     if(row['report_lvl4']!=null&&row['report_lvl4'].includes(id)){
        //         found.push("report_lvl4")
        //         // console.log("Found @ report_lvl4")
        //     }
        //     if(row['report_lvl5']!=null&&row['report_lvl5'].includes(id)){
        //         found.push("report_lvl5")
        //         // console.log("Found @ report_lvl5")
        //     }
        // })
        console.log(found[0].workshop_id)
        // found.map((jsn)=>{
        //     console.log(jsn+" "+jsn[0])
        // })
        sql="update data_ecr_workshop set report_lvl1=? where workshop_id=? and report_lvl1 like ?"
        base.query(sql,[id,found[0].workshop_id,'%'+id+'%'])
        res.status(200).json({rows})
    })
})

// route.put('/approvebyeverylevel/:empid',async(req,res)=>{
//     const id=req.params.empid
//     // let sql="select * from data_ecr_workshop where is_eve_completed is null and report_lvl1 like ? or report_lvl2 like ? or report_lvl3 like ? or report_lvl4 like ? or report_lvl5 like ?"

//     //const levels=['report_lvl1','report_lvl2','report_lvl3','report_lvl4','report_lvl5']

//     let sql="update data_ecr_workshop set ? = ? where is_eve_completed is null and ? like ?"
//     for (const iterator of found) {
//         base.query(sql,[iterator,id,iterator,'%'+id+'%'],(err,rows)=>{
//             if(err){
//                 res.status(500).json({error:err.message})
//                 return
//             }
//             // if(rows.length==0){
//             //     res.status(404).json({message:"No ECR Workshop mathced"})
//             //     return
//             // }
//             // res.status(200).json({rows})
//         })
//     }
// })

module.exports=route