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
          field: 'name',
        },
        {
          width: 9,
          label: scoreboard.winsLabel,
          index: 2,
          field: 'wins',
        },
        {
          width: 9,
          label: scoreboard.lossesLabel,
          index: 3,
          field: 'losses',
        },
        {
          width: 9,
          label: 'Total',
          index: 4,
          field: 'total',
        },
        {
          width: 9,
          label: scoreboard.wlrLabel,
          index: 5,
          format: (content: number) => content.toFixed(2),
          field: 'wlr',
        },
        {
          width: 9,
          label: scoreboard.winRateLabel,
          index: 6,
          format: (content) => `${(content * 100).toFixed(0)}%`,
          field: 'winRate',
        },
      ],
      {
        sortBy: ['wlr', 'total'],
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

      tableBuilder.addRows({
        name: user ? user.username : key,
        wins: score.wins,
        losses: score.losses,
        total: score.wins + score.losses,
        wlr: ShowBoard._calcWlr(score),
        winRate: ShowBoard._calcWinRate(score),
      });
    }

    reply(cmd, `Scoreboard **${scoreboard.name}**:\n${tableBuilder.build()}`);
  }

  private static _calcWlr(score: IScore): number {
    if (score.losses === 0) {
      return score.wins;
    }

    return score.wins / score.losses;
  }

  private static _calcWinRate(score: IScore): number {
    const total = score.wins + score.losses;
    if (total === 0) {
      return 0;
    }

    return score.wins / total;
  }
}
