import { Command, CommandMessage, Infos } from '@typeit/discord';
import { validArgs } from '../utils/valid-args';
import { isAuthorAdmin } from '../utils/is-author-admin';
import { updateScore } from '../services/update-score';

interface SetScoreArgs {
  wins: number;
  losses: number;
  scoreboard: string;
}

export abstract class SetScore {
  @Command('setscore :player :wins :losses :scoreboard')
  @Infos({ admin: true })
  async setScore(cmd: CommandMessage<SetScoreArgs>) {
    if (!isAuthorAdmin(cmd)) {
      return;
    }

    if (!validArgs(cmd, /@[^\s]+ \d+ \d+ [^\s]+/)) {
      return;
    }

    await updateScore(cmd, cmd.mentions.users.first(), cmd.args.scoreboard, cmd.args.wins, cmd.args.losses);
  }
}
