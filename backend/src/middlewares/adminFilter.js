// jwtMiddleware.ts
import jwt from 'jsonwebtoken';
// Load the .env variable
import dotenv from 'dotenv';
dotenv.config();

/**
 * This middleware inject the user id and role in the request if the authorization is provided
 * else it will return a 401 code 
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns none
 */
const adminFilter = (req, res, next) => {

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    // Check 
    if(!decoded.isAdmin){
        return res.status(401).json({ message: 'Only administrators or authorized' });
    }
    req.userId = decoded.userId;
    req.isAdmin = decoded.isAdmin

    next(); 
  });
};

export default adminFilter;
