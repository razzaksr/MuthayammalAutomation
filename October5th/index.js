const express=require('express')
const bodyParser=require('body-parser')
const workshop=require('./ecr')
const sixth=require('./oct6th')
const seven=require('./oct7th')
const cors=require('cors')

const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/work',workshop)
app.use('/six',sixth)
app.use('/seven',seven)
app.use(cors())

app.listen(1234,()=>{
    console.log("App is running")
})