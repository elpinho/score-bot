import mongoose, { Mongoose } from 'mongoose';
import { Db } from 'mongodb';

export async function initMongoose(): Promise<Db> {
  const dbUrl = process.env.MONGODB_URL;

  const mng: Mongoose = await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 15000,
  });

  mongoose.set('useFindAndModify', false);
  return mng.connection.db;
}
