import { initMongoose } from './init-mongoose';
import { initDI } from './init-di';
import './stop-handler';

export default ({ client }) => {
  console.log('Connecting to the database');
  initMongoose()
    .then(() => console.log('Connected to the database'))
    .catch((e) => {
      console.error(`Failed to connect to the database: ${e.message}`);
      console.error(e);
    });

  initDI({ client });
};
