const express = require('express')
const app = express()
const cors = require('cors')

//midle wear 
app.use(cors())
app.use(express.json())
//port 
const port = process.env.Port ||5000

// defult api
app.get('/', (res,reaq)=>{
    res.send('server is on')
})

//port listen
app.listen(port, ()=>{
    console.log('service is running', port)
})