const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');



app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.o3j1i.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){
try{
  await client.connect()
  const manufacturerCollection = client.db('manufacturer').collection('tools');
  const userCollection = client.db('manufacturer').collection('user');
  const purchaseCollection = client.db('manufacturer').collection('purchase');
  const reviewCollection = client.db('manufacturer').collection('review');
  

  app.put('/user/:email', async(req, res) => {
   const email = req.params.email;
   const user = req.body;
   const filter = {email: email}
   const options = { upsert: true };
   const updateEmail = {
    $set: user
  };
  const result = await userCollection.updateOne(filter, updateEmail, options);
  const token = jwt.sign({email: email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
  res.send({result, token})
  })

  app.put('/user/admin/:email', async(req, res) => {
    const email = req.params.email;
    console.log("email", email)
    const filter = {email: email}
    const updateEmail = {
     $set: {
      role: "admin"
     }
    }
   const result = await userCollection.updateOne( filter,  updateEmail);
   res.send(result)
   });
 

 app.get('/user', async(req, res) => {
  const result = await userCollection.find().toArray()
  res.send(result)
 })

 app.get('/admin/:email', async(req, res) => {
  const email = req.params.email;
  const query = {email: email}
  const userData = await userCollection.findOne(query)
   const isAdmin = userData.role === 'admin'
   res.send({admin: isAdmin})
 
 })

 app.delete('/user/:email', async(req, res) => {
  const email = req.params.email;
  const result = await userCollection.deleteOne({email: email})
  res.send(result)
 })

 // specific id 
 app.get('/service/:id', async (req, res) => {
  const id = req.params.id;
  const query = {_id:ObjectId(id)}
  const result = await manufacturerCollection.findOne(query)
  res.send(result)
 })
  
  app.get('/service', async(req, res) => {
   const query = {};
   const service = manufacturerCollection.find(query);
   const result = await service.toArray();
   res.send(result)
  })
  
  // app.put('/purchase/:id', async(req, res) => {
  //   const updatedProduct = req.body
  
  //   const { updatedQuantity } = updatedProduct;
  //   const id = req.params.id;
  //   const query = { _id: ObjectId(id) };
  //   const options = { upsert: true };

  //   const updateProduct = {
  //       $set: {
  //         menimum: updatedQuantity
  //       },
  //   };

  //   const result = await manufacturerCollection.updateOne(query, updateProduct, options);

  //   res.send(result);
  // });

  // get my orders 
  
  app.get('/purchase', async(req, res) => {
    const email = req.query.email
    console.log('email is', email)
    const query = {email: email}
    const purchase = purchaseCollection.find(query)
    const result = await purchase.toArray()
    res.send(result) 
  })

  //get review

  app.get('/review', async(req, res) => {
    const query = {};
    const cursor = reviewCollection.find(query);
    const result = await cursor.toArray();
    res.send(result)
  })

  // post purchase details

  app.post('/purchase', async(req, res) => {
    const purchase = req.body;
    const result = await purchaseCollection.insertOne(purchase)
    res.send(result)
  })

  // post review 
  app.post('/review', async(req, res) => {
    const review = req.body;
    const result = await reviewCollection.insertOne(review)
    res.send(result)
  })

  // add new product
  app.post('/service', async(req, res) => {
    const product = req.body;
    const result = await manufacturerCollection.insertOne(product)
    res.send(result)
  })

  // delete order
  app.delete('/purchase/:id', async(req, res) => {
    const id = req.params.id;
    const query = {_id:ObjectId(id)}
    const result = await purchaseCollection.deleteOne(query)
    res.send(result)
  })

  // delete tools
  app.delete('/service/:id', async(req, res) => {
    const id = req.params.id;
    const query = {_id:ObjectId(id)}
    const result = await manufacturerCollection.deleteOne(query)
    res.send(result)
  })

}
finally{

}
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('manufacturer website running')
});
app.listen(port, () => {
  console.log('server is running', port)
});


