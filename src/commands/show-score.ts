import { Command, CommandMessage } from '@typeit/discord';
import { findScoreboard } from '../services/find-scoreboard';
import { parseArgs } from '../utils/parse-args';
import { User } from 'discord.js';
import { createScoreboardTable } from '../services/create-scoreboard-table';
import { reply } from '../utils/reply';

export class ShowScore {
  @Command('score')
  async showScore(cmd: CommandMessage) {
    const [scoreboardName, users] = ShowScore._parseArgs(cmd);
    const scoreboard = await findScoreboard(cmd, scoreboardName);
    if (!scoreboard) {
      return;
    }

    const scoreLabel = users.length === 1 ? 'Score' : 'Scores';

    const tableBuilder = await createScoreboardTable(
      cmd.client,
      scoreboard,
      users.map((user) => user.id)
    );

    reply(cmd, `${scoreLabel} in **${scoreboard.name}**:\n${tableBuilder.build()}`);
  }

  private static _parseArgs(cmd: CommandMessage): [string | undefined, User[]] {
    const users: User[] = [];
    let scoreboardName;

    const args = parseArgs(cmd);
    if (args.length === 0) {
      users.push(cmd.author);
    } else {
      if (!args[0].match(/<.+?>/)) {
        scoreboardName = args[0];
      }

      if (cmd.mentions.users.size === 0) {
        users.push(cmd.author);
      } else {
        users.push(...cmd.mentions.users.array());
      }
    }

    return [scoreboardName, users];
  }
}
