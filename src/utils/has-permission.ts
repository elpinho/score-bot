import { CommandMessage } from '@typeit/discord';
import { reply } from './reply';
import { PermissionResolvable } from 'discord.js';

interface Permissions {
  operator?: 'and' | 'or';
  values: PermissionResolvable[];
}

const defaultPermissions: Permissions = {
  operator: 'or',
  values: ['ADMINISTRATOR', 'VIEW_AUDIT_LOG'],
};

export function hasPermission(cmd: CommandMessage, permissions?: Permissions): boolean {
  if (!checkPermissions(cmd, permissions || defaultPermissions)) {
    reply(cmd, "You don't have permission to use that command");
    return false;
  }

  return true;
}

export function checkPermissions(cmd: CommandMessage, permissions?: Permissions) {
  if (!cmd.member) {
    return;
  }

  // Merge default with given permissions
  permissions = Object.assign({}, defaultPermissions, permissions);

  for (const permission of permissions.values) {
    if (permissions.operator === 'or' && cmd.member.hasPermission(permission)) {
      return true;
    }

    if (permissions.operator === 'and' && !cmd.member.hasPermission(permission)) {
      return false;
    }
  }

  return permissions.operator === 'and';
}
