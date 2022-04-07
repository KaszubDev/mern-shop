const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  url: process.env.MONGODB_URL,
  api_key: process.env.API_KEY,
  endpoint: process.env.API_URL,
  jwt_secret: process.env.JWT_SECRET
};