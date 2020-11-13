import {Score} from '../model/score';
import {TableBuilder} from './table-builder';
import {mapKeys, mapValue} from '../utils/map';
import {findUser} from './find-user';
import {IScoreboard} from '../model/scoreboard';
import {Client} from 'discord.js';

export async function createScoreboardTable(client: Client, scoreboard: IScoreboard, ids?: string[]): Promise<TableBuilder<Score>> {
  const tableBuilder = new TableBuilder<Score>(
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

  let keys = mapKeys(scoreboard.scores);
  if (ids) {
    keys = keys.filter(key => ids.includes(key));
  }

  for (const key of keys) {
    const user = await findUser(key, client);
    const name = user ? user.username : key;
    const score = Score.clone({...mapValue(scoreboard.scores, key), name});
    tableBuilder.addRows(score);
  }

  return tableBuilder;
}
