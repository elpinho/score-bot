import { Command, CommandMessage, Infos } from '@typeit/discord';
import { hasPermission } from '../utils/has-permission';
import { parseArgs } from '../utils/parse-args';
import { findLatestScoreboard, findScoreboard } from '../services/find-scoreboard';
import { IScoreboard } from '../models/scoreboard';

import { updateScoreboard } from '../services/update-scoreboard';
import { mapValue, setMapValue } from '../utils/map';

export abstract class AddLoss {
  @Command('addloss')
  @Infos({ admin: true })
  async addLoss(cmd: CommandMessage) {
    if (!hasPermission(cmd) || cmd.mentions.users.size === 0) {
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
      const score = mapValue(scoreboard.scores, user.id) || { wins: 0, losses: 0 };
      score.losses++;

      setMapValue(scoreboard.scores, user.id, score);
    });

    await updateScoreboard(scoreboard, cmd);
  }
}
