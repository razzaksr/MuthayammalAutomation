const express=require('express')
const bodyParser=require('body-parser')
const workshop=require('./ecr')
const sixth=require('./oct6th')

const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/work',workshop)
app.use('/six',sixth)

app.listen(1234,()=>{
    console.log("App is running")
})