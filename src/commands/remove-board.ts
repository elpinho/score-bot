import { Command, CommandMessage, Infos } from '@typeit/discord';
import { scoreboardModel } from '../model/scoreboard';
import { findScoreboard, scoreboardByNameCondition } from '../services/find-scoreboard';
import { reply } from '../utils/reply';
import {isAuthorAdmin} from '../utils/is-author-admin';

interface RemoveBoardArgs {
  name: string;
}

export class RemoveBoard {
  @Command('removeboard :name')
  @Infos({ admin: true })
  async removeBoard(cmd: CommandMessage<RemoveBoardArgs>) {
    if (!isAuthorAdmin(cmd)) {
      return;
    }

    const scoreboard = await findScoreboard(cmd, cmd.args.name);
    if (!scoreboard) {
      return;
    }

    try {
      await scoreboardModel.deleteOne(scoreboardByNameCondition(cmd.args.name));
      reply(cmd, `Removed the scoreboard **${scoreboard.name}**`);
    } catch (e) {
      reply(cmd, `Could not remove the scoreboard **${scoreboard.name}**`);
      console.error(e);
    }
  }
}
