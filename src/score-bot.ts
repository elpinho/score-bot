import { CommandMessage, CommandNotFound, Description, Discord } from '@typeit/discord';
import * as path from 'path';

@Discord('_', {
  import: [path.join(__dirname, 'commands', '*.ts')],
})
@Description('Discord bot to keep track of scores')
export abstract class ScoreBot {
  @CommandNotFound()
  notFoundA(command: CommandMessage) {
    command.reply('Command not found');
  }
}
