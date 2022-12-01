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


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster001.flqwhrj.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
       const dbServicesCollection = client.db('wellpic').collection('services')
       const rivewsCollection = client.db('wellpic').collection('reviews')

    
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
      app.get('/service/:id', async(req,res)=>{
         const id = req.params.id
         const filter = {_id: ObjectId(id)}
         const results = await dbServicesCollection.findOne(filter)
         res.send(results)

      })
      //post reviews 
      app.post('/addreview', async(req,res)=>{
          
         const reviewInformation= req.body
         const results = await rivewsCollection.insertOne(reviewInformation)
         res.send(results)

      })
      //getReviews 
      app.get('/reviews/:id', async(req,res)=>{
          const {id}= req.params
          
          const filter = {serviceId: id}
          const results = await rivewsCollection.find(filter).toArray()
          res.send(results)
      })

      app.get('/myreviews/:email', async(req,res)=>{
          
         const email = req.params.email
         
         const filter = {email: email}
         const results = await rivewsCollection.find(filter).toArray()
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
