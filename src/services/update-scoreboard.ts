import { IScoreboard, scoreboardModel } from '../model/scoreboard';
import { scoreboardByNameCondition } from './find-scoreboard';
import { CommandMessage } from '@typeit/discord';
import { reply } from '../utils/reply';

export async function updateScoreboard(scoreboard: IScoreboard, cmd?: CommandMessage) {
  try {
    await scoreboardModel.findOneAndUpdate(scoreboardByNameCondition(scoreboard.name), scoreboard);
    reply(cmd, `Updated scoreboard **${scoreboard.name}**. Use \`_board\` to see it.`);
  } catch (e) {
    reply(cmd, `Could not update the scores on scoreboard **${scoreboard.name}**.`);
    console.error(e);
  }
}
