const express=require('express')
const bodyParser=require('body-parser')
const workshop=require('./ecr')

const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/work',workshop)

app.listen(1234,()=>{
    console.log("App is running")
})