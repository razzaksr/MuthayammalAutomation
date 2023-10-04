const express=require('express')
const bodyParser=require('body-parser')

// const hod=require('./hod')
// const principal=require('./principal')
const admin=require('./admin')
// const role=require('./roles')
const roles=require('./rolesoct3rd')

const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// app.use('/hod',hod)
// app.use('/principal',principal)
app.use('/admin',admin)
// app.use('/role',role)
app.use('/roles',roles)


app.listen(1234,()=>{
    console.log("App is running")
})