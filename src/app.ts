import { Client } from '@typeit/discord';
import { initMongoose } from './utils/init-mongoose';

require('dotenv').config();

export class Main {
  private static _client: Client;

  static get Client(): Client {
    return this._client;
  }

  static start() {
    console.log('Connecting to the database');
    initMongoose()
      .then(() => console.log('Connected to the database'))
      .catch((e) => {
        console.error(`Failed to connect to the database: ${e.message}`);
        console.error(e);
      });

    console.log('Logging in');

    this._client = new Client();
    this._client
      .login(process.env.TOKEN, `${__dirname}/*.ts`, `${__dirname}/*.js`)
      .then(() => {
        console.log('Successfully logged in');
      })
      .catch((e) => {
        console.error(`Failed to login: ${e.message}`);
        console.error(e);
      });
  }
}

Main.start();
