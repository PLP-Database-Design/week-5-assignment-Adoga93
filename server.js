// import our dependencies 
const express = require("express")
const app = express()
const mysql = require('mysql2');
const dotenv = require('dotenv'); 

// 
app.use(express.json());
dotenv.config(); 

// connection to the database 
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
});

// test the connection 
db.connect((err) => {
    // If no connection 
    if(err) return console.log("Error connecting to MYSQL");

    //If connect works successfully
    console.log("Connected to MYSQL as id: ", db.threadId); 
}) 

// Question 1. Retrieve all patients

app.get('/patients', (req,res) => {

    db.query('SELECT patient_id,first_name,last_name,date_of_birth FROM patients', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else {
            //Display the records to the browser 
            res.status(200). send(results);
        }
    });
});

// Question 2. Retrieve all providers

app.get('/providers', (req,res) => {

    // Retrieve data from database 
    db.query('SELECT first_name,last_name,provider_specialty FROM providers', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else {
            //Display the records to the browser 
            res.status(200). send(results);
        }
    });
});

// Question 3. Filter patients by First Name

app.get('/patients_firstName', (req,res) => {

    db.query('SELECT patient_id,first_name,last_name,date_of_birth FROM patients ORDER BY first_name', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else {
            //Display the records to the browser 
            res.status(200). send(results);
        }
    });
});

// Question 2. Retrieve all providers by their specialty

app.get('/providers_providerSpecialty', (req,res) => {

    // Retrieve data from database 
    db.query('SELECT first_name,last_name,provider_specialty FROM providers ORDER BY provider_specialty', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else {
            //Display the records to the browser 
            res.status(200). send(results);
        }
    });
});

// start and listen to the server
app.listen(3000, () => {
    console.log(`server is running on port 3300...`)
})