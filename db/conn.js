const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

async function connectToServer(callback) {
  try {
    await client.connect();
    db = client.db(); // ya estás usando `taskmanager` en la URI
    console.log("✅ Connected to MongoDB");
    callback();
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

function getDb() {
  return db;
}

module.exports = { connectToServer, getDb };
