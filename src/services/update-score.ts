import { CommandMessage } from '@typeit/discord';
import { findScoreboard, scoreboardByNameCondition } from './find-scoreboard';
import { IScoreboard, scoreboardModel } from '../model/scoreboard';
import { reply } from '../utils/reply';
import { User } from 'discord.js';

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

  scoreboard.scores.set(user.id, {
    wins: Number(cmd.args.wins),
    losses: Number(cmd.args.losses),
  });

  await scoreboardModel.findOneAndUpdate(scoreboardByNameCondition(scoreboard.name), scoreboard);
  reply(
    cmd,
    `Updated **${user.username}**'s score to **${wins}** ${scoreboard.winsLabel} **${losses}** ${scoreboard.lossesLabel} on scoreboard **${scoreboard.name}**.`
  );
}
