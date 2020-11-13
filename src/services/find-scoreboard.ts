import { scoreboardModel, IScoreboard } from '../model/scoreboard';
import { CommandMessage } from '@typeit/discord';
import { reply } from '../utils/reply';

interface FindScoreboardOptions {
  ignoreNotFoundError?: boolean;
}

export const scoreboardByNameCondition = (name: string) => ({ name: new RegExp(`^${name}$`, 'i') });

export async function findScoreboard(
  cmd: CommandMessage,
  name?: string,
  options?: FindScoreboardOptions
): Promise<IScoreboard | null> {
  try {
    let scoreboard;

    if (name) {
      scoreboard = await scoreboardModel.findOne(scoreboardByNameCondition(name)).lean();
    } else {
      scoreboard = findLatestScoreboard(cmd);
      // error message already sent
      if (!scoreboard) {
        return;
      }
    }

    if (!scoreboard) {
      if (!options || !options.ignoreNotFoundError) {
        reply(cmd, `Could not find the scoreboard **${name}**.`);
      }

      return null;
    }

    return scoreboard;
  } catch (e) {
    if (!options || !options.ignoreNotFoundError) {
      reply(cmd, 'Error finding the scoreboard.');
    }

    console.error(e);
    return null;
  }
}

export async function findLatestScoreboard(cmd: CommandMessage): Promise<IScoreboard | null> {
  try {
    const scoreboard = await scoreboardModel.findOne().sort({ createdAt: -1 }).lean();
    if (!scoreboard) {
      reply(cmd, 'Could not find a scoreboard.');
    }

    return scoreboard as IScoreboard;
  } catch (e) {
    reply(cmd, 'Error while finding the scoreboard.');
    console.error(e);
    return null;
  }
}
