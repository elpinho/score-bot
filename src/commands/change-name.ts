import { Command, CommandMessage, Infos } from '@typeit/discord';
import { hasPermission } from '../utils/has-permission';
import { updateScoreboard } from '../services/update-scoreboard';
import { findScoreboard } from '../services/find-scoreboard';

interface ChangeNameArgs {
  oldName: string;
  newName: string;
}

export abstract class ChangeName {
  @Command('changename :oldName :newName')
  @Infos({ admin: true })
  async changeName(cmd: CommandMessage<ChangeNameArgs>) {
    if (!hasPermission(cmd)) {
      return;
    }

    if (!cmd.args.newName || !cmd.args.newName) {
      return;
    }

    const scoreboard = await findScoreboard(cmd, cmd.args.oldName);
    if (!scoreboard) {
      return;
    }

    scoreboard.name = cmd.args.newName;
    await updateScoreboard(scoreboard, cmd);
  }
}
