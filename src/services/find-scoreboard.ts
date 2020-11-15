import { IScoreboard } from '../models/scoreboard';
import { CommandMessage } from '@typeit/discord';
import { reply } from '../utils/reply';
import { PersistenceContext } from '../persistence/persistence-context';

interface FindScoreboardOptions {
  ignoreNotFoundError?: boolean;
}

export async function findScoreboard(
  cmd: CommandMessage,
  name?: string,
  options?: FindScoreboardOptions
): Promise<IScoreboard | null> {
  try {
    let scoreboard;

    const scoreboardRepo = PersistenceContext.scoreboards();
    if (name) {
      scoreboard = await scoreboardRepo.findByName(name);
    } else {
      scoreboard = await findLatestScoreboard(cmd);
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
    const scoreboardRepo = PersistenceContext.scoreboards();
    const scoreboard = await scoreboardRepo.findLatest();
    if (!scoreboard) {
      reply(cmd, 'Could not find a scoreboard.');
    }

    return scoreboard;
  } catch (e) {
    reply(cmd, 'Error while finding the scoreboard.');
    console.error(e);
    return null;
  }
}
