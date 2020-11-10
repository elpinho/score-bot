import { Command, CommandMessage, Infos } from '@typeit/discord';
import { scoreboardModel } from '../model/scoreboard';
import { reply } from '../utils/reply';
import { hasPermission } from '../utils/has-permission';
import { findScoreboard } from '../services/find-scoreboard';

interface AddBoardArgs {
  name: string;
}

export abstract class AddBoard {
  @Command('addboard :name')
  @Infos({ admin: true })
  async addBoard(cmd: CommandMessage<AddBoardArgs>) {
    if (!hasPermission(cmd)) {
      return;
    }

    const scoreboard = await findScoreboard(cmd, cmd.args.name, { ignoreNotFoundError: true });
    if (scoreboard) {
      reply(cmd, `A scoreboard with the name **${scoreboard.name}** already exists.`);
      return;
    }

    try {
      const created = await scoreboardModel.create({
        name: cmd.args.name,
      });
      reply(cmd, `Created scoreboard **${created.name}**.`);
    } catch (e) {
      if (e.code === 11000) {
        reply(cmd, `A scoreboard with the name **${cmd.args.name}** already exists.`);
        return;
      }

      reply(cmd, 'Could not create the scoreboard');
      console.error(e);
    }
  }
}
