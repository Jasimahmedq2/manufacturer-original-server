const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const { verifyJWT } = require('./Middleware/verifyJwt');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)




app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.o3j1i.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
  try {
    await client.connect()
    const manufacturerCollection = client.db('manufacturer').collection('tools');
    const userCollection = client.db('manufacturer').collection('user');
    const purchaseCollection = client.db('manufacturer').collection('purchase');
    const paymentCollection = client.db('manufacturer').collection('payment');

    const reviewCollection = client.db('manufacturer').collection('review');

    //payment-intent
    app.post('/create-payment-intent', async (req, res) => {
      const { price } = req.body;
      const amount = price * 100
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
      })
      res.send({ clientSecret: paymentIntent.client_secret })
    })

    app.put('/user/:email', async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email }
      const options = { upsert: true };
      const updateEmail = {
        $set: user
      };
      const result = await userCollection.updateOne(filter, updateEmail, options);

      const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })

      res.send({ result, token })
    })

    app.put('/user/admin/:email', async (req, res) => {
      const email = req.params.email;
      console.log("email", email)
      const filter = { email: email }
      const updateEmail = {
        $set: {
          role: "admin"
        }
      }
      const result = await userCollection.updateOne(filter, updateEmail);
      res.send(result)
    });


    app.get('/user', verifyJWT, async (req, res) => {
      const result = await userCollection.find().toArray()
      res.send(result)
    })

    app.get('/admin/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { email: email }
      const userData = await userCollection.findOne(query)
      const isAdmin = userData.role === 'admin'
      res.send({ admin: isAdmin })

    })

    app.delete('/user/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      const result = await userCollection.deleteOne({ email: email })
      res.send(result)
    })

    // specific id 
    app.get('/service/:id', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await manufacturerCollection.findOne(query)
      res.send(result)
    })

    app.get('/service', async (req, res) => {
      const query = {};
      const service = manufacturerCollection.find(query).sort({ $natural: -1 });
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

    app.get('/purchase', verifyJWT, async (req, res) => {
      const email = req.query.email
      console.log('email is', email)
      const query = { email: email }
      const purchase = purchaseCollection.find(query).sort({ $natural: -1 })
      const result = await purchase.toArray()
      res.send(result)
    })

    app.get('/manageorder', verifyJWT, async (req, res) => {
      const result = await purchaseCollection.find().sort({ $natural: -1 }).toArray()
      res.send(result)
    })

    // app.delete('/manageorder/:id', async(req, res) => {
    //   const id = req.params.id;
    //   const filter = {_id: ObjectId(id)}
    //   const result = await purchaseCollection.deleteOne(filter)
    //   res.send(result)
    // })

    app.patch('/shipped/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) }
      const updateDoc = {
        $set: {
          shipped: true
        }
      }
      const result = await purchaseCollection.updateOne(filter, updateDoc)
      res.send(result)
    })

    app.get('/payment/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) }
      const result = await purchaseCollection.findOne(filter)
      res.send(result)
    })

    //get review

    app.get('/review',  async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query).sort({ $natural: -1 });
      const result = await cursor.toArray();
      res.send(result)
    })

    // post purchase details

    app.post('/purchase', verifyJWT, async (req, res) => {
      const purchase = req.body;
      const result = await purchaseCollection.insertOne(purchase)
      res.send(result)
    })

    // post review 
    app.post('/review', async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review)
      res.send(result)
    })

    // add new product
    app.post('/service',  async (req, res) => {
      const product = req.body;
      const result = await manufacturerCollection.insertOne(product)
      res.send(result)
    })

    // delete order
    app.delete('/purchase/:id', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await purchaseCollection.deleteOne(query)
      res.send(result)
    })

    app.delete('/manageorderdelete/:id', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await purchaseCollection.deleteOne(query)
      res.send(result)
    })

    // delete tools
    app.delete('/service/:id', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await manufacturerCollection.deleteOne(query)
      res.send(result)
    });

    // payment

    app.patch('/payment/:id', verifyJWT, async (req, res) => {
      const id = req.params.id
      const payment = req.body;
      console.log(payment)
      const filter = { _id: ObjectId(id) }
      const updatePurchase = {
        $set: {
          paid: true,
          transactionId: payment.transactionId
        }
      }
      const inserted = await paymentCollection.insertOne(payment)
      const result = await purchaseCollection.updateOne(filter, updatePurchase)
      res.send(result)

    })

  }
  finally {

  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('manufacturer website running')
});
app.listen(port, () => {
  console.log('server is running', port)
});


