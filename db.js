const mysql=require('mysql2')
const dataBase=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Razak@123",
    database:"mec_project"
})

dataBase.connect((err)=>{
    if(err){
        console.error(err.message)
        return
    }
    console.log("dataBase connected")
})

module.exports=dataBase