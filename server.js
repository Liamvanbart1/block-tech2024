const express = require('express');
const app = express();
const port = 3000;

const data = [
  {
    username: 'test',
    password: 'test'
  }
]


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
  res.render('base'), { data: data };
});

// post ipv get

app.post('/base', (req, res) => {
  console.log(req.body);

  data.push({
    username: req.body.username,
    password: req.body.password
  });

  res.render('base', { data: data });
})  



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

// functie voor posten 

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