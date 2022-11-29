const express = require('express')
const app = express()
const cors = require('cors')

//midle wear 
app.use(cors())
app.use(express.json())
//port 
const port = process.env.Port ||5000

//dot env require 
require('dotenv').config()

// defult api
app.get('/', (res,reaq)=>{
    res.send('server is on')
})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster001.flqwhrj.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{


    }
    finally{


        
    }
}

//port listen
app.listen(port, ()=>{
    console.log('service is running', port)
})
