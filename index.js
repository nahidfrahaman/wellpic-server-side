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
app.get('/', (req,res)=>{
    res.send('server is on')
})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster001.flqwhrj.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
       const dbServicesCollection = client.db('wellpic').collection('services')

    
      app.get('/home/services', async(req,res)=>{
         const query = {}
         const results= await dbServicesCollection.find(query).limit(3).toArray()
         res.send(results)
      })
      app.get('/all/services', async(req,res)=>{
         const query = {}
         const results= await dbServicesCollection.find(query).toArray()
         res.send(results)
      })
    }
    finally{

    }

}
run().catch(er=> console.log(er))

//port listen
app.listen(port, ()=>{
    console.log('service is running', port)
})
