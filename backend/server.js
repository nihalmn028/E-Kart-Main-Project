const express = require('express')
const helmet =require('helmet')

const cors=require('cors')
const dotenv=require('dotenv').config()
const registerRouter=require('./Routes/userRegister')
const cartManage=require('./Routes/cartmanage')

const ProductCreation=require('./Routes/productscreate')
const loginRouter=require('./Routes/userLogin')
const userprofile=require('./Routes/userProfile')
const profileEdit=require('./Routes/profileEdit')
const adminUserManagement=require('./Routes/adminUserManagement')
const productManagement=require('./Routes/productManagement')
const dbConnection=require('./DbConnection/dbConnection')
const tokenValidate=require('./Routes/tokenValidation')
const otpValidate=require('./Routes/otpvalidate')
const payment=require('./Routes/payment')

const forgotPass=require('./Routes/forgotPass')
const filecheck=require('./Routes/filecheck')
const app=express()
const port=process.env.PORT
const corsSetting={
  origin: process.env.ORIGIN, 
  methods: 'GET,PUT,POST,DELETE',
  credentials: true,
} 
app.use(cors(corsSetting)); 
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use('/',registerRouter)
app.use('/',loginRouter)
app.use('/',tokenValidate)
app.use('/',otpValidate)
app.use('/checkout',payment) 

app.use('/',ProductCreation)
app.use('/userprofile',userprofile)
app.use('/',profileEdit)
app.use('/usermanagement',adminUserManagement)
app.use('/productmanagement',productManagement)
app.use('/',filecheck)
app.use('/forgotpass',forgotPass) 
app.use('/cartmanage',cartManage) 
 

app.listen(port,()=>{   
console.log("Server Is Running")
dbConnection
}) 
