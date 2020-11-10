import { Command, CommandMessage, Infos } from '@typeit/discord';
import { findScoreboard } from '../services/find-scoreboard';
import { reply } from '../utils/reply';
import { IScore } from '../model/score';
import { TableBuilder } from '../services/table-builder';

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

    const tableBuilder = new TableBuilder(
      [
        {
          width: 25,
          label: 'Name',
          index: 1,
        },
        {
          width: 10,
          label: scoreboard.winsLabel,
          index: 2,
        },
        {
          width: 10,
          label: scoreboard.lossesLabel,
          index: 3,
        },
        {
          width: 10,
          label: 'Total',
          index: 4,
        },
        {
          width: 10,
          label: scoreboard.wlrLabel,
          index: 5,
          format: (content: number) => content.toFixed(2),
        },
        {
          width: 10,
          label: scoreboard.winRateLabel,
          index: 6,
        },
      ],
      {
        sortBy: 5,
        sortDirection: 'desc',
      }
    );

    const keys = Array.from(scoreboard.scores.keys());
    for (const key of keys) {
      const score = scoreboard.scores.get(key);
      let user = cmd.client.users.cache.find((u) => u.id === key);
      if (!user) {
        user = await cmd.client.users.fetch(key);
      }

      tableBuilder.addRow([
        {
          column: 'Name',
          content: user ? user.username : key,
        },
        {
          column: scoreboard.winsLabel,
          content: score.wins,
        },
        {
          column: scoreboard.lossesLabel,
          content: score.losses,
        },
        {
          column: 'Total',
          content: score.wins + score.losses,
        },
        {
          column: scoreboard.wlrLabel,
          content: this._calcWlr(score),
        },
        {
          column: scoreboard.winRateLabel,
          content: this._calcWinRate(score),
        },
      ]);
    }

    reply(cmd, `Scoreboard **${scoreboard.name}**:\n${tableBuilder.build()}`);
  }

  private _calcWlr(score: IScore): number {
    if (score.losses === 0) {
      return score.wins;
    }

    return score.wins / score.losses;
  }

  private _calcWinRate(score: IScore): string {
    const total = score.wins + score.losses;
    if (total === 0) {
      return '0%';
    }

    return `${((score.wins / total) * 100).toFixed(0)}%`;
  }
}
