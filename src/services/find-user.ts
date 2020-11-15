import { Client } from '@typeit/discord';
import { Container } from 'typedi';

export async function findUser(id: string) {
  const client = Container.get(Client);
  return client.users.cache.find((u) => u.id === id) || (await client.users.fetch(id));
}
