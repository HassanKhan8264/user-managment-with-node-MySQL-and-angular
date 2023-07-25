const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2')

const app = express()

app.use(cors())
app.use(bodyParser.json())

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'userinfo',
    port:3306


});


app.get('/users', (req, res) => {
  // console.log('get all user data');
  let qrr = 'SELECT * FROM users';
  db.query(qrr, (err,results) => {
    if(err){
      console.log(err,'error');
    }
    if(results.length > 0 ){
      res.send({
        message:'all users',
        data:results
      })
    }
  })
});


db.connect((err) => {
  if(err){
   console.log('data base is not connect');
  }
  console.log('database is connected');
})

// http://localhost:4200/

app.listen(3000, () => {
  console.log('port is running on heredsadasdadasd');
})
