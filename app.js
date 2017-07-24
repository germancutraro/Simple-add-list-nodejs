const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const file = 'data.json';
const port = 5000 || process.env.PORT;

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

let users = [];

app.get('/', (req, res) => res.render('index') );

app.get('/information', (req, res) => {
  res.render('information', {
    data: users //send too our file information ours users
  });
});

app.post('/save', (req, res) => {
    users.push({name: req.body.name || '', age: req.body.age || ''}); // adding
    fs.writeFile(file, JSON.stringify(users)); // we write the file to save it
    res.redirect('/information'); // go to the information page
});

// for the reload
fs.readFile(file, (err, content) => {
  if (err) {}
  else {
    users = JSON.parse(content.toString());
  }
});

app.listen(port, () => console.log(`Running on port ${port}`));
