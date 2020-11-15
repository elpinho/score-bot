import { Container } from 'typedi';
import { Client } from '@typeit/discord';

/**
 * Setup dependency injection
 * @param dependencies
 */
export function initDI({ client }) {
  Container.set(Client, client);
}
