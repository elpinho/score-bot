import { CommandMessage } from '@typeit/discord';
import { reply } from './reply';

export function hasPermission(cmd: CommandMessage): boolean {
  if (!(cmd.member && (cmd.member.hasPermission('ADMINISTRATOR') || cmd.member.hasPermission('VIEW_AUDIT_LOG')))) {
    reply(cmd, "You don't have permission to use that command");
    return false;
  }

  return true;
}
