import { IScoreboard } from '../models/scoreboard';
import { CommandMessage } from '@typeit/discord';
import { reply } from '../utils/reply';
import { PersistenceContext } from '../persistence/persistence-context';

export async function updateScoreboard(scoreboard: IScoreboard, cmd?: CommandMessage) {
  try {
    const scoreboardRepo = PersistenceContext.scoreboards();
    await scoreboardRepo.update(scoreboard);
    reply(cmd, `Updated scoreboard **${scoreboard.name}**. Use \`_board\` to see it.`);
  } catch (e) {
    reply(cmd, `Could not update the scores on scoreboard **${scoreboard.name}**.`);
    console.error(e);
  }
}
