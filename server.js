const express = require('express');
const app = express()

app.get('/', function (req, res) {
  res.send('Deze server runt goed loopt op poort 3000!')
})

app.listen(3000)


