import mongoose, { Mongoose } from 'mongoose';
import { Db } from 'mongodb';

export async function initMongoose(): Promise<Db> {
  const dbUrl = process.env.MONGODB_URL;
  if (!dbUrl) {
    console.error('MongoDB URL not found! Please set the MONGODB_URL environment variable [in a .env file].');
    return;
  }

  const mng: Mongoose = await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 15000,
  });

  mongoose.set('useFindAndModify', false);
  return mng.connection.db;
}
