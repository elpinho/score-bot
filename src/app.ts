import { Client } from '@typeit/discord';
import { Container } from 'typedi';
import loaders from './loaders';

export class Main {
  private static _client: Client;

  // noinspection JSUnusedGlobalSymbols
  static get Client(): Client {
    return this._client;
  }

  static start() {
    loaders();

    this._client = new Client();
    this._login();

    Container.set(Client, this._client);
  }

  private static _login() {
    this._client
      .login(process.env.TOKEN, `${__dirname}/*.ts`, `${__dirname}/*.js`)
      .then(() => {
        console.log('Logged in');
      })
      .catch((e) => {
        console.error(`Failed to login: ${e.message}`);
        console.error(e);
      });
  }
}

Main.start();
