import { CommandMessage } from '@typeit/discord';

export function validArgs(cmd: CommandMessage, regExp: RegExp): boolean {
  const content = cmd.commandContent;

  const firstSpace = content.indexOf(' ');
  if (firstSpace === -1) {
    return regExp.test('');
  }

  return regExp.test(content.substring(firstSpace + 1));
}
