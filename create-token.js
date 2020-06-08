const MongoClient = require('mongodb').MongoClient;
const settings = require('./settings');
const mongo_uri = `mongodb://${settings.database.host}:${settings.database.port}`;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ************************************************************
// Assuming that this info is coming from a form from a web app
// ************************************************************
const username = 'yannis';
const password = 'password';
// ************************************************************
// Assuming that this info is coming from process.env.secret
// ************************************************************
const secret = 's3cr3t';
const expiresIn = 3600;
// ************************************************************

MongoClient.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(client => {
  const db = client.db('project');
  const collection = db.collection('users');
  collection.findOne({ username }).then(response => {
    bcrypt.compare(password, response.password, (error, result) => {
      if (result) {
        console.log('Authentication successful');
        const payload = {
          username: response.username,
          isAdmin: false
        };
        const token = jwt.sign(payload, secret, { expiresIn });
        console.log(token);
      }
    });
  });
}).catch(error => console.error(error));

// ************************************************************
// Token example
// ************************************************************
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inlhbm5pcyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE1ODk3MTYyMDksImV4cCI6MTU4OTcxNjI2OX0.HSBUBh-s1s3w17IuCj3PK0cNvYw753wpGhD-YaH0rjw