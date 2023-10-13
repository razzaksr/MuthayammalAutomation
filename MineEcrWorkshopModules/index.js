const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const workshop=require('./ecrWorkshopFlow')
const authorize=require('./logging')
const seminar=require('./ecrSeminarFlow')

const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/ecr',workshop)
app.use('',authorize)
app.use('/seminar',seminar)


app.listen(1234,()=>{
    console.log("App is running")
})