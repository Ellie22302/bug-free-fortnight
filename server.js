const express = require('express');


const path = require('path');

const fs = require('fs');


const uuid = require('uuid');
const { type } = require('os');


var uniqueID;


const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('/notes/api', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync("db/db.json","utf8"));
    res.json(dbJson);
});


app.post('/notes/api', (req, res) => {

    uniqueID =  uuid.v4();
    
    const dbJson = JSON.parse(fs.readFileSync("db/db.json","utf8"));

    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uniqueID
    };
   
    dbJson.push(newNote);

    fs.writeFileSync("db/db.json",JSON.stringify(dbJson));
    res.json(dbJson);
  });

  app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);