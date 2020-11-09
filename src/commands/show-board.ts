import { Command, CommandMessage, Infos } from '@typeit/discord';
import { findScoreboard } from '../services/find-scoreboard';
import { reply } from '../utils/reply';
import pad from 'pad';
import { IScore } from '../model/score';

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

    const sortedKeys = Array.from(scoreboard.scores.keys()).sort(
      (a, b) => this._calcKdr(scoreboard.scores.get(b)) - this._calcKdr(scoreboard.scores.get(a))
    );

    sortedKeys.forEach((key) => {
      const score = scoreboard.scores.get(key);
      const user = cmd.client.users.resolve(key);

      message +=
        '\n' +
        pad(user ? user.username : key, sizeCol1) +
        pad(String(score.wins), sizeCol2) +
        pad(String(score.losses), sizeCol3) +
        pad(String(score.losses + score.wins), sizeCol4) +
        pad(this._calcKdr(score).toFixed(2), sizeCol5);
    });

    message += '\n' + pad('', totalSize, '-');
    reply(cmd, message + '`');
  }

  private _calcKdr(score: IScore): number {
    if (score.losses === 0) {
      return score.wins;
    }

    return score.wins / score.losses;
  }
}
