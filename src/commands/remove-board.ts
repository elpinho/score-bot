import { Command, CommandMessage, Infos } from '@typeit/discord';
import { findScoreboard } from '../services/find-scoreboard';
import { reply } from '../utils/reply';
import { hasPermission } from '../utils/has-permission';
import { PersistenceContext } from '../persistence/persistence-context';

interface RemoveBoardArgs {
  name: string;
}

export abstract class RemoveBoard {
  @Command('removeboard :name')
  @Infos({ admin: true })
  async removeBoard(cmd: CommandMessage<RemoveBoardArgs>) {
    if (!hasPermission(cmd)) {
      return;
    }

    const scoreboard = await findScoreboard(cmd, cmd.args.name);
    if (!scoreboard) {
      return;
    }

    try {
      const scoreboardRepo = PersistenceContext.scoreboards();
      await scoreboardRepo.deleteByName(cmd.args.name);
      reply(cmd, `Removed the scoreboard **${scoreboard.name}**`);
    } catch (e) {
      reply(cmd, `Could not remove the scoreboard **${scoreboard.name}**`);
      console.error(e);
    }
  }
}
