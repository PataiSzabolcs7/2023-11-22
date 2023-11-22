const express = require('express');
const app = express(); //-- http szerver tudunk vele létrehozni.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

const mysql = require('mysql');
const db= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tagdij'
});
db.connect((err =>{
    if (err) throw err;
    console.log('connection! DANM! I Call Michael! DAMNN!')
}))

app.get('/', (req, res) => {
    res.send('Welcome World');
});

app.get('/TheEnd', (req, res) => {
    res.send('Ez a végzet napja');
});

app.get('/TheEnd/:id', (req, res) => {
    let id = req.params.id;
    res.send(`Ez a végzet napja, id: ${id}`);
});

app.get('/TheEnd/:id/:nev', (req, res) => {
    let id = req.params.id;
    let nev = req.params.nev;
    res.send(`Ez a végzet napja, id: ${id} nev: ${nev}`);
});

app.post('/TheEnd', (req, res) => {
    let id = req.body.id;
    let nev = req.body.nev;
    res.send(`Ez a végzet napja #POST id: ${id} nev: ${nev}`);
});

app.get('/tagok/:id', (req, res) => {
        let sqlcommand = `SELECT * FROM ugyfel WHERE azon=${req.params.id}`;
    db.query(sqlcommand, (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.get('/tagok', (req, res) => {
    let sqlcommand = 'SELECT * FROM `ugyfel`';
db.query(sqlcommand, (err, rows) => {
    if (err) throw err;
    res.send(rows);
});
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
});