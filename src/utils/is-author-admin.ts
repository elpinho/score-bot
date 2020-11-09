import { CommandMessage } from '@typeit/discord';
import { reply } from './reply';

export function isAuthorAdmin(cmd: CommandMessage): boolean {
  if (!cmd.member || !cmd.member.hasPermission('ADMINISTRATOR')) {
    reply(cmd, 'You must be an administrator to use that command');
    return false;
  }

  return true;
}
