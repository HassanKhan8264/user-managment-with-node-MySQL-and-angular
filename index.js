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

app.get('/user/:id', (req, res) => {
  let qrId = req.params.id;
  let qrr = 'SELECT * FROM users WHERE id = ?'; // Assuming the primary key column is named "id"

  db.query(qrr, [qrId], (error, results) => {
    if (error) {
      console.log('Error fetching user:', error);
      res.status(500).send('Error fetching user');
    } else {
      if (results.length > 0) {
        res.send({
          message: 'User found',
          data: results
        });
      } else {
        console.log('User not found');
        res.status(404).send('User not found');
      }
    }
  });
});

app.post('/user', (req, res) => {
  console.log('user is added');
  console.log(req.body, '');
  let username = req.body.username;
  let email = req.body.email;
  let mobile = req.body.mobile;
  let qrr = 'INSERT INTO users (username, email, mobile) VALUES (?, ?, ?)';
  db.query(qrr, [username, email, mobile], (err, result) => {
    if (err) {
      console.error('Error adding user:', err);
      res.status(500).send('Something went wrong');
    } else {
      res.send({
        message: 'User added',
        data: result, // Note: "result" might not contain the inserted rows; it depends on the database driver used.
      });
    }
  });
});

app.put('/user/:id', (req, res) => {
  let rqId = req.params.id;
  let username = req.body.username;
  let email = req.body.email;
  let mobile = req.body.mobile;

  // Ensure to use placeholders in the SQL query to prevent SQL injection
  let qrr = 'UPDATE users SET username = ?, email = ?, mobile = ? WHERE id = ?';

  // The values to be inserted should be passed as an array in the second argument of db.query
  db.query(qrr, [username, email, mobile, rqId], (err, result) => {
    if (err) {
      console.log('something went wrong');
      res.status(500).send('Something went wrong');
    } else {
      res.send({
        message: 'user edited successfully',
        body: result,
      });
    }
  });
});

// Assuming you have set up the necessary dependencies and initialized the Express app
app.delete('/user/:id', (req, res) => {
  let rqId = req.params.id;

  // Ensure to use placeholders in the SQL query to prevent SQL injection
  let qrr = 'DELETE FROM users WHERE id = ?';

  // The values to be inserted should be passed as an array in the second argument of db.query
  db.query(qrr, [rqId], (err, result) => {
    if (err) {
      console.log('something went wrong');
      res.status(500).send('Something went wrong');
    } else {
      res.send({
        message: 'user DELETED successfully',
        data: result,
      });
    }
  });
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
