import { Command, CommandMessage, Infos } from '@typeit/discord';
import { hasPermission } from '../utils/has-permission';

export abstract class Export {
  @Command('export')
  @Infos({ admin: true })
  export(cmd: CommandMessage) {
    if (!hasPermission(cmd, { values: ['ADMINISTRATOR'] })) {
      return;
    }

    // TODO: Export scoreboards
  }
}
