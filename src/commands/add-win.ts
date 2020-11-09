import { Command, CommandMessage, Infos } from '@typeit/discord';
import { isAuthorAdmin } from '../utils/is-author-admin';
import { parseArgs } from '../utils/parse-args';
import { findLatestScoreboard, findScoreboard } from '../services/find-scoreboard';
import { IScoreboard } from '../model/scoreboard';

import { updateScoreboard } from '../services/update-scoreboard';

export abstract class AddWin {
  @Command('addwin')
  @Infos({ admin: true })
  async addWin(cmd: CommandMessage) {
    if (!isAuthorAdmin(cmd) || cmd.mentions.users.size === 0) {
      return;
    }

    const args = parseArgs(cmd);
    if (args.length === 0) {
      return;
    }

    let scoreboard: IScoreboard;
    if (!args[0].startsWith('@') && !args[0].startsWith('<@')) {
      scoreboard = await findScoreboard(cmd, args[0]);
    } else {
      scoreboard = await findLatestScoreboard(cmd);
    }

    if (!scoreboard) {
      return;
    }

    cmd.mentions.users.forEach((user) => {
      const score = scoreboard.scores.get(user.id) || { wins: 0, losses: 0 };
      score.wins++;

      scoreboard.scores.set(user.id, score);
    });

    await updateScoreboard(scoreboard, cmd);
  }
}
