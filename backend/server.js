const express = require("express")
const app = express()
const port = 3000
const dotenv = require("dotenv").config()
const {MongoClient} = require("mongodb")
const {ObjectId} = require("mongodb")
const bodyparser = require("body-parser")


const url = "mongodb://localhost:27017/"
const client = new MongoClient(url)
const dbName = "PassStore"

const cors = require("cors")

app.use(bodyparser.json())
app.use(cors())

client.connect()

app.get('/',async (req,res)=>{
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const Result = await collection.find({}).toArray()
    res.json(Result)
})
app.post('/',async (req,res)=>{
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const Result = await collection.insertOne(password)
    res.send({sucess:true, result:Result})
})
app.delete('/:id',async (req,res)=>{
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const Result = await collection.deleteOne({id:req.params.id})
    res.send({sucess:true, result:Result})
})
app.put('/:id', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');

    const Result = await collection.updateOne(
        { id: req.params.id },     
        { $set: req.body }         
    );

    res.send({ success: true, result: Result });
});

app.listen(port,()=>{
    console.log(`Server is listening on port http://localhost:${port}`)
})