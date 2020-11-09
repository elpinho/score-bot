import { Command, CommandMessage, Infos } from '@typeit/discord';
import { findScoreboard } from '../services/find-scoreboard';
import { reply } from '../utils/reply';
import pad from 'pad';
import { IScore } from '../model/score';
import { IScoreboard } from '../model/scoreboard';

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

    let message = `Scoreboard **${scoreboard.name}**:\n\``;

    const sizeCol1 = 25;
    const sizeCol2 = 10;
    const sizeCol3 = 10;
    const sizeCol4 = 10;
    const sizeCol5 = 10;
    const totalSize = sizeCol1 + sizeCol2 + sizeCol3 + sizeCol4 + sizeCol5;

    message +=
      pad('Name', sizeCol1) +
      pad(scoreboard.winsLabel, sizeCol2) +
      pad(scoreboard.lossesLabel, sizeCol3) +
      pad('Total', sizeCol4) +
      pad(scoreboard.wlrLabel, sizeCol5, ' ') +
      '\n';
    message += pad('', totalSize, '-');

    const sortedKeys = this._sort(scoreboard);

    for (const key of sortedKeys) {
      const score = scoreboard.scores.get(key);
      let user = cmd.client.users.cache.find((u) => u.id === key);
      if (!user) {
        user = await cmd.client.users.fetch(key);
      }

      message +=
        '\n' +
        pad(user ? user.username : key, sizeCol1) +
        pad(String(score.wins), sizeCol2) +
        pad(String(score.losses), sizeCol3) +
        pad(String(score.wins + score.losses), sizeCol4) +
        pad(this._calcWlr(score).toFixed(2), sizeCol5);
    }

    reply(cmd, message + '`');
  }

  private _calcWlr(score: IScore): number {
    if (score.losses === 0) {
      return score.wins;
    }

    return score.wins / score.losses;
  }

  private _sort(scoreboard: IScoreboard) {
    return Array.from(scoreboard.scores.keys()).sort((a, b) => {
      const scoreA = scoreboard.scores.get(a);
      const scoreB = scoreboard.scores.get(b);

      const kdrDiff = this._calcWlr(scoreB) - this._calcWlr(scoreA);
      if (kdrDiff !== 0) {
        return kdrDiff;
      }

      const winsDiff = scoreB.wins - scoreB.wins;
      if (winsDiff !== 0) {
        return winsDiff;
      }

      return scoreA.losses - scoreB.losses;
    });
  }
}
