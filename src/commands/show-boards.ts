import { Command, CommandMessage } from '@typeit/discord';
import { scoreboardModel, IScoreboard } from '../model/scoreboard';
import { reply } from '../utils/reply';
import pad from 'pad';
import { formatDate } from '../utils/format-date';

export abstract class ShowBoards {
  @Command('boards')
  async showBoards(cmd: CommandMessage) {
    try {
      const boards = await scoreboardModel.find({}).sort({ updatedAt: -1 });
      reply(cmd, this._makeList(boards));
    } catch (e) {
      reply(cmd, "I can't list the scoreboards right now.");
      console.error(e);
    }
  }

  private _makeList(boards: IScoreboard[]): string {
    const sizeCol1 = 20;
    const sizeCol2 = 13;
    const sizeCol3 = 13;
    const totalSize = sizeCol1 + sizeCol2 + sizeCol3;

    let list = 'Boards:\n`';

    list += pad('Name', sizeCol1) + pad('Created', sizeCol2) + pad('Last Used', sizeCol3, ' ') + '\n';
    list += pad('', totalSize, '-');

    boards.forEach((board) => {
      const created = formatDate(board['createdAt']);
      const updated = formatDate(board['updatedAt']);

      list += '\n' + pad(board.name, sizeCol1) + pad(created, sizeCol2) + pad(updated, sizeCol3);
    });

    return list + '\n' + pad('', totalSize, '-') + '`';
  }
}
