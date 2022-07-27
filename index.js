const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.o3j1i.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){
try{
  await client.connect()
  const manufacturerCollection = client.db('manufacturer').collection('tools');

  app.get('/service', async(req, res) => {
   const query = {};
   const service = manufacturerCollection.find(query);
   const result = await service.toArray();
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


