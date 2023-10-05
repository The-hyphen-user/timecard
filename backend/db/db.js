

import mongodb from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()


const connectionString = process.env.MONGODB_CONNECTION_URL

const client = new mongodb.MongoClient(connectionString)


client.connect()
const db = client.db('postCollection')

export default db;