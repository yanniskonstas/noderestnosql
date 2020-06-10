require('dotenv').config();
const ObjectID = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

function authenticate(req, res, next) {
    const { authorization } = req.headers;
    if (authorization) {
      // Authorization: Bearer token
      const token = authorization.split(' ')[1];
      jwt.verify(token, secret, (error, decodedToken) => {
        if (error) {
          return res.status(401).json('Authentication error');
        } else {
          req.decoded = decodedToken;
          next();
        }
      })
    } else {
      return res.status(403).json('No token provided');
    }
  }

function ConvertToObjectID(req, res, next) {
  const { id } = req.params;
  req.ObjectID = new ObjectID(id);
  next();
}

module.exports = {
  ConvertToObjectID,
  authenticate
};