import { initMongoose } from './init-mongoose';
import * as dotenv from 'dotenv';

export default () => {
  dotenv.config();

  console.log('Connecting to the database');
  initMongoose()
    .then(() => console.log('Connected to the database'))
    .catch((e) => {
      console.error(`Failed to connect to the database: ${e.message}`);
      console.error(e);
    });
};
