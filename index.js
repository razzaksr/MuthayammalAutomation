const express=require('express')
const bodyParser=require('body-parser')

// const hod=require('./hod')
// const principal=require('./principal')
const admin=require('./admin')

const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// app.use('/hod',hod)
// app.use('/principal',principal)
app.use('/admin',admin)

app.listen(7070,()=>{
    console.log("App is running")
})