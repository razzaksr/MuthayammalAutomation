const express=require('express')
const route=express.Router()
const base=require('./db')

route.post('/proposal',async(req,res)=>{
    const{eveName,eveProposedBy,eveDept}=req.body
    // const eveDept=req.params.dept
    let eveAuthority1=0;
    base.query("select designation_name from data_designation right join faculties on designation_id=faculties.faculty_desig where faculty_desig in(103,104,105) and faculty_dept=?",[eveDept],(err,row)=>{
        if(err){
            // console.log("error in faculty id fetch")
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({message:"No authorities found"})
            return
        }
        //res.status(200).json({row})
        // eveAuthority1=row[0].designation_name
        // console.log(eveAuthority1)
        let proposalHods=""
        for(var index=0;index<row.length;index++){
            (row[index+1])?proposalHods+=row[index].designation_name+",":proposalHods+=row[index].designation_name
        }
        console.log(proposalHods)
        // const sql="insert into eventsthird(eve_id,eve_name,eve_proposed_by,eve_proposal_level1,eve_proposal_level2,eve_status,eve_dept) values(?,?,?,?,?,?,?)"
        // base.query(sql,[eveId,eveName,eveProposedBy,proposalHods,"Principal",0,eveDept],(err,result)=>{
        const sql="insert into eventsthird(eve_name,eve_proposed_by,eve_proposal_level1,eve_proposal_level2,eve_status,eve_dept) values(?,?,?,?,?,?)"
        base.query(sql,[eveName,eveProposedBy,proposalHods,"Principal",0,eveDept],(err,result)=>{
            if(err){
                console.log("error in insertion")
                res.status(500).json({error:err.message})
                return
            }
            res.status(200).json({message:"ECR created",id:result.insertId})
        })
    }) 
})

route.get('/readlevel1/:eveId',async(req,res)=>{
    base.query("select eve_proposal_level1 from eventsthird where eve_id=?",[req.params.eveId],(err,row)=>{
        if(err){
            // console.log("error in faculty id fetch")
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({message:"No authorities found"})
            return
        }
        let authorities=""
        authorities=row[0].eve_proposal_level1
        authorities=authorities.split(",")
        res.status(200).json({"message":`Level 1 authorities ${authorities}`})
    })
})

route.put('/level1/:id/:design',async(req,res)=>{
    const sql="update eventsthird set eve_proposal_level1=?, eve_status=1 where eve_id=? and eve_status != 1"
    base.query(sql,[req.params.design,req.params.id],(err,ack)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(ack.affectedRows==0){
            res.status(404).json({message:"No match found"})
            return
        }
        res.status(200).json({message:`Proposal acknowledged by ${req.params.design}`})
    })
})

route.put('/level2/:id',async(req,res)=>{
    const sql="update eventsthird set eve_status=2 where eve_id=? and eve_status!=2"
    base.query(sql,[req.params.id],(err,ack)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(ack.affectedRows==0){
            res.status(404).json({message:"No match found"})
            return
        }
        res.status(200).json({message:`Proposal acknowledged by principal`})
    })
})

route.post('/society',async(req,res)=>{
    const{eveName,eveDept}=req.body
    let eveAuthority1=0;
    const sql="select designation_name from data_designation right join faculties on designation_id=faculties.faculty_desig where faculty_desig in(103,104,105) and faculty_dept=?"
    base.query(sql,[eveDept],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({message:"No authorities found"})
            return
        }
        //res.status(200).json({row})
        // eveAuthority1=row[0].designation_name
        // console.log(eveAuthority1)
        let proposalHods=""
        for(var index=0;index<row.length;index++){
            (row[index+1])?proposalHods+=row[index].designation_name+",":proposalHods+=row[index].designation_name
        }
        console.log(proposalHods)
        // const sql="insert into eventsthird(eve_id,eve_name,eve_proposed_by,eve_proposal_level1,eve_proposal_level2,eve_status,eve_dept) values(?,?,?,?,?,?,?)"
        // base.query(sql,[eveId,eveName,eveProposedBy,proposalHods,"Principal",0,eveDept],(err,result)=>{
        const sql="insert into eventsthird(eve_name,eve_proposed_by,eve_proposal_level1,eve_proposal_level2,eve_status,eve_dept) values(?,?,?,?,?,?)"
        base.query(sql,[eveName,"Society Coordinator",proposalHods,"Principal",0,eveDept],(err,result)=>{
            if(err){
                console.log("error in insertion")
                res.status(500).json({error:err.message})
                return
            }
            res.status(200).json({message:"ECR created",id:result.insertId})
        })
    }) 
})

module.exports=route