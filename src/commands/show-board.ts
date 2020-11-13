import { Command, CommandMessage, Infos } from '@typeit/discord';
import { findScoreboard } from '../services/find-scoreboard';
import { reply } from '../utils/reply';
import {createScoreboardTable} from '../services/create-scoreboard-table';

interface ShowBoardArgs {
  name?: string;
}

export class ShowBoard {
  @Command('board :name')
  @Infos({ admin: true })
  async showBoard(cmd: CommandMessage<ShowBoardArgs>) {
    const scoreboard = await findScoreboard(cmd, cmd.args.name);
    if (!scoreboard) {
      return;
    }

    const tableBuilder = await createScoreboardTable(cmd.client, scoreboard);
    reply(cmd, `Scoreboard **${scoreboard.name}**:\n${tableBuilder.build()}`);
  }
}
