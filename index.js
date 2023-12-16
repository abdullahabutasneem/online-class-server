
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://nafisafarid5:dVgs7aZ4tHQI1nJD@cluster0.puncwrq.mongodb.net/?retryWrites=true&w=majority";
// console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
// dVgs7aZ4tHQI1nJD
// nafisafarid5
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //await client.connect();

    const teacherCollection = client.db("csteHub").collection("teachers");

    // Added product Post function
    app.post("/teachers", async(req, res) => {
      const prod = req.body;
      console.log("added prod:",prod);
      const result = await teacherCollection.insertOne(prod);
      res.send(result);
    })

    // Added product Get function
    app.get('/teachers', async(req, res) => {
      const cursor = teacherCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  console.log("Hello server");
  res.send("Hello server in client");
})

app.listen(port, () => {
  console.log(`Server is active on port: ${port}`);
})