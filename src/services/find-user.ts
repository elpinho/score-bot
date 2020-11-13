import { Client } from 'discord.js';

export async function findUser(id: string, client: Client) {
  return client.users.cache.find((u) => u.id === id) || (await client.users.fetch(id));
}
