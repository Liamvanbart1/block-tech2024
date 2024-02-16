const express = require('express');
const app = express();
const port = 3000;

// Middleware

app.set('view engine', 'ejs');
app.use(express.static('static'));

// Routes 

app.get('/', (req, res) => {
  res.render('base');
})

app.get('/register', (req, res) => {
  res.send('Registratiepagina');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

