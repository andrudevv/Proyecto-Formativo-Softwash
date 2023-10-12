import  dotenv from 'dotenv';
dotenv.config();
const config = {
  apikey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,

};

export { config };
