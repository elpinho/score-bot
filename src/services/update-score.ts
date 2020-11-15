import { CommandMessage } from '@typeit/discord';
import { findScoreboard } from './find-scoreboard';
import { IScoreboard } from '../models/scoreboard';
import { reply } from '../utils/reply';
import { User } from 'discord.js';
import { setMapValue } from '../utils/map';
import { PersistenceContext } from '../persistence/persistence-context';

export async function updateScore(
  cmd: CommandMessage,
  user: User,
  scoreboard: string | IScoreboard,
  wins: string | number,
  losses: string | number
) {
  if (typeof scoreboard === 'string') {
    scoreboard = await findScoreboard(cmd, scoreboard);
    if (!scoreboard) {
      return;
    }
  }

  setMapValue(scoreboard.scores, user.id, {
    wins: Number(cmd.args.wins),
    losses: Number(cmd.args.losses),
  });

  const scoreboardRepo = PersistenceContext.scoreboards();
  await scoreboardRepo.update(scoreboard);
  reply(
    cmd,
    `Updated **${user.username}**'s score to **${wins}** ${scoreboard.winsLabel} **${losses}** ${scoreboard.lossesLabel} on scoreboard **${scoreboard.name}**.`
  );
}
