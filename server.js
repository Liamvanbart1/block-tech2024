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


const collection = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION);
// Einde Mongo DB


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('static'));


// Routes 

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/register', (req, res) => {
  res.send('Registratiepagina');
});

app.get('/base', (req, res) => {
  res.render('base');
});

app.post('/base', async (req, res) => {
  console.log(req.body);

  const user = {
    title: req.body.username,
    plot: req.body.password
  }

  await collection.insertOne(user);


  res.redirect('/base');
});


// async function run() {
//   try {
//     const database = client.db('sample_mflix');
//     const movies = database.collection('movies');
//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);
//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);







app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});  






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


