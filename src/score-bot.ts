import { ArgsOf, CommandMessage, CommandNotFound, Description, Discord, On } from '@typeit/discord';
import { reply } from './utils/reply';
import * as path from 'path';
import pad from 'pad';

@Discord('_', {
  import: [path.join(__dirname, 'commands', '*.ts')],
})
@Description('Discord bot to keep track of scores')
export abstract class ScoreBot {
  @CommandNotFound()
  notFoundA(cmd: CommandMessage) {
    // noinspection JSIgnoredPromiseFromCall
    reply(cmd, 'Command not found. Use `_help` for a list of commands.');
  }

  @On('message')
  private onMessage([message]: ArgsOf<'message'>) {
    if (message.author.username === 'ScoreBot') {
      const firstComma = message.content.indexOf(',');
      const newContent = message.content.substring(firstComma + 3);
      message.edit(newContent);
      message.content = newContent;
    }

    console.log(`${pad(message.author.username, 14)} - ${message}`);
  }
}
