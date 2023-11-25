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

app.get('/tagok/:id/:delete', (req, res) => {
    let sqldelete = `DELETE FROM ugyfel WHERE ugyfel.azon = ${req.params.id}`;
db.query(sqldelete, (err, rows) => {
    if (err) throw err;
    res.send(rows);
});
});

app.get('/tagok/:id/:update', (req, res) => {
    let sqlupdate= UPDATE `ugyfel SET nev = '${req.params.nev}', szulev = '${req.params.szulev}', orsz = '${req.params.orsz}' WHERE ugyfel.azon = ${req.params.id}`;
db.query(sqlupdate, (err, rows) => {
    if (err) throw err;
    res.send(rows);
});
});
app.get('/tagok/:id/:insert', (req, res) => {
    let sqlinsert = `INSERT INTO ugyfel (${req.params.azon}, ${req.params.nev}, ${req.params.szulev}, ${req.params.irszam}, ${req.params.orsz}) VALUES ('1901', 'Fekete Ernő', '1984', '10231', 'A'), ('', NULL, NULL, NULL, NULL)`;
db.query(sqlinsert, (err, rows) => {
    if (err) throw err;
    res.send(rows);
});
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
});


