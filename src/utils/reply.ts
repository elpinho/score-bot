import { CommandMessage } from '@typeit/discord';

export function reply(cmd: CommandMessage, message: string, options?: any) {
  message = '\n' + message;
  if (!(message.endsWith('.') || message.endsWith('`'))) {
    message += '.';
  }

  cmd.reply({
    content: message,
    ...options,
  });
}
