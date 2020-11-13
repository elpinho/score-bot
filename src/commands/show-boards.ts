import { Command, CommandMessage } from '@typeit/discord';
import { scoreboardModel, IScoreboard } from '../model/scoreboard';
import { reply } from '../utils/reply';
import { formatDate } from '../utils/format-date';
import { TableBuilder } from '../services/table-builder';

export abstract class ShowBoards {
  @Command('boards')
  async showBoards(cmd: CommandMessage) {
    try {
      const boards = await scoreboardModel.find({}).sort({ updatedAt: -1 }).lean();
      reply(cmd, this._makeList(boards as IScoreboard[]));
    } catch (e) {
      reply(cmd, "I can't list the scoreboards right now.");
      console.error(e);
    }
  }

  private _makeList(boards: IScoreboard[]): string {
    const tableBuilder = new TableBuilder<IScoreboard>([
      {
        label: 'Name',
        index: 1,
        width: 20,
        field: 'name',
      },
      {
        label: 'Created',
        index: 2,
        width: 13,
        format: (content) => formatDate(content),
        field: 'createdAt',
      },
      {
        label: 'Last Used',
        index: 3,
        width: 13,
        format: (content) => formatDate(content),
        field: 'updatedAt',
      },
    ]);

    tableBuilder.addRows(...boards);
    return `Boards:\n${tableBuilder.build()}`;
  }
}
