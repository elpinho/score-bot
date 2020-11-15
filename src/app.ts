import { Client } from '@typeit/discord';
import loaders from './loaders';
import * as dotenv from 'dotenv';

export class Main {
  private static _client: Client;

  // noinspection JSUnusedGlobalSymbols
  static get Client(): Client {
    return this._client;
  }

  static start() {
    // load .env file
    dotenv.config();

    this._client = new Client({
      classes: [`${__dirname}/*Discord.ts`, `${__dirname}/*Discord.js`],
      silent: true,
      variablesChar: ':',
    });

    this._login();
  }

  private static _login() {
    if (!process.env.TOKEN) {
      console.error('Token not found! Please set the TOKEN environment variable [in a .env file].');
      return;
    }

    console.log('Logging in');
    this._client
      .login(process.env.TOKEN, `${__dirname}/*.ts`, `${__dirname}/*.js`)
      .then(() => {
        console.log('Logged in');
        loaders({ client: this._client });
      })
      .catch((e) => {
        console.error(`Failed to login: ${e.message}`);
        console.error(e);
      });
  }
}

Main.start();
