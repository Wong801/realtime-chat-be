const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI
const loadClient = () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return client
}

module.exports = loadClient