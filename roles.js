const express=require('express')
const route=express.Router()
const base=require('./db')

// proposal sample
route.post('/proposal',async(req,res)=>{
    const{eveName,eveProposedBy,eveDept}=req.body
    // const eveDept=req.params.dept
    let eveAuthority1=0;
    base.query("select faculty_id from faculties where faculty_desig=103 and faculty_dept=?",[eveDept],(err,row)=>{
        if(err){
            // console.log("error in faculty id fetch")
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({message:"No authorities found"})
            return
        }
        eveAuthority1=row[0].faculty_id
        console.log(eveAuthority1)
        const sql="insert into events(eve_name,eve_proposed_by,eve_authority_level1,eve_authority_level2,eve_status,eve_dept) values(?,?,?,?,?,?)"
        base.query(sql,[eveName,eveProposedBy,eveAuthority1,1100,0,eveDept],(err,result)=>{
            if(err){
                console.log("error in insertion")
                res.status(500).json({error:err.message})
                return
            }
            res.status(200).json({message:"ECR created",id:result.insertId})
        })
    }) 
})

route.get('/allecr',async(req,res)=>{
    base.query("select * from events",(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({message:"No events found"})
            return
        }
        res.status(200).json({rows})
    })
})

route.get('/allproposed',async(req,res)=>{
    base.query("select * from events where eve_status=0",(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({message:"No events found"})
            return
        }
        res.status(200).json({rows})
    })
})

route.get('/allproposedbydept/:dept',async(req,res)=>{
    base.query("select * from events where eve_status=0 and eve_dept=?",[req.params.dept],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({message:"No events found"})
            return
        }
        //res.status(200).json({rows})
        base.query("select faculty_name,faculty_id from faculties where faculty_dept=? and faculty_desig in(103,104)",[req.params.dept],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({message:"No Authorities found"})
                return
            }
            row.forEach(element => {
                console.log(element.faculty_id)
            });
            eveAuthority1=row
            console.log(eveAuthority1)
            res.status(200).json({"events":rows,"alternatives":row})
        })
    })
})

route.get('/checkauth/:eveId',async(req,res)=>{
    let authorities=[]
    base.query("select eve_dept,faculty_name,faculty_id from events right join faculties on eve_dept=faculty_dept where eve_id=? and faculty_desig in(103,104,105)",[req.params.eveId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({error:"No records found"})
            return
        }
        authorities=rows
        //res.status(200).json(authorities)
        base.query("select faculty_name,faculty_id from faculties where faculty_desig=102 and faculty_dept=?",
        [authorities[0].eve_dept],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                // res.status(404).json({error:"No alternates found to level2"})
                res.status(200).json({"level-1 alternatives":authorities,"level-2 alternates":"No alternatives for level-2"})
                return
            }
            res.status(200).json({"level-1 alternatives":authorities,"level-2 alternatives":row})
        })
    })
})

route.put('/updateauth/:eveId',async(req,res)=>{
    const{level1,level2}=req.body
    const eveId=req.params.eveId
        const sql="update events set eve_authority_level1=?, eve_authority_level2=? where eve_id=?";
        base.query(sql,[level1,level2,eveId],(err,result)=>{
            if(err){
                console.log("error in insertion")
                res.status(500).json({error:err.message})
                return
            }
            res.status(200).json({message:"ECR updated",id:eveId})
        })
    // let event={}
    // base.query("select * from events where eve_id=?",[req.params.eveId],(err,rows)=>{
    //     if(err){
    //         res.status(500).json({error:err.message})
    //         return
    //     }
    //     if(rows.length==0){
    //         res.status(404).json({error:"No records found"})
    //         return
    //     }
    //     event=rows[0]
    // })
})

// route.get('/getauth/:dept',async(req,res)=>{
//     // const{eveId,eveName,eveProposedBy,eveDept}=req.body
//     // const{eveDept}=req.body
//     let eveAuthority1=0

//     base.query("select faculty_name,faculty_id from faculties where faculty_dept=? and faculty_desig in(102,103,104)",[req.params.dept],(err,row)=>{
//         if(err){
//             res.status(500).json({error:err.message})
//             return
//         }
//         if(row.length==0){
//             res.status(404).json({message:"No Authorities found"})
//             return
//         }
//         row.forEach(element => {
//             console.log(element.faculty_id)
//         });
//         eveAuthority1=row
//         console.log(eveAuthority1)
//         res.status(200).json({row})
//     })
    
//     // base.query(sql,[eveId,eveName,eveProposedBy,eveAuthority1])
// })

module.exports=route