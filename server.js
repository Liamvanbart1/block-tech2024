const express = require('express');
require('dotenv').config();
const app = express();
const port = 3000;



// Mongo DB 


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// Database en collection aanmaken

const collection = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION);
const collectionkunst = client.db(process.env.DB_NAMEKUNST).collection(process.env.DB_COLLECTIONKUNST);


// Einde Mongo DB


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('static'));


// Routes 

app.get('/', (req, res) => {
  res.render('welkom');
});

app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/base', (req, res) => {
  res.render('base');
});


app.get('/data', async (req, res) => {
  const gebruikers = await collection.find().toArray();
  res.render('data', { gebruikers });
});

app.get('/patchen', async (req, res) => {
  const kunst = await collectionkunst.find().toArray();
  res.render('patchen', { kunst });
  console.log(kunst);
});
// Gebruiker aanmaken in database eerste versie // 

app.post('/home', async (req, res) => {
  
  const user = {
    username: req.body.username,
    password: req.body.password
  }

  await collection.insertOne(user);
  console.log(user);

  res.redirect('/data');
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});  




// Eerste versie van de API
// api fetchen voor database aanpassen


// const rundata = async () => {
//   try {
//     const response = await fetch('http://localhost:4000/forum')  

//     if (!response.ok) {
//       throw new Error('Netwerkfout bij het ophalen van gegevens')  
//     }

//     const data = await response.json()
//     const users = data.records
//     console.log('Lijst van gebruikers: ', users)
//     return users
    
//   } catch (error) {
//     console.error('Er is een fout opgetreden:', error)  
//   }
// }


// console.log (rundata())

// functie voor posten in API

// async function createUser(event) {
//   event.preventDefault();  
//   const response = await fetch('http://localhost:4000/person', {
//     method: 'POST',  
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json'  
//     },
//     body: JSON.stringify({
//       name: username.value,  
//       password: password.value,
//     })
//   });
// }


