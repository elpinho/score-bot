import { CommandMessage } from '@typeit/discord';

export function parseArgs(cmd: CommandMessage): string[] {
  const content = cmd.commandContent.replace(/\s\s+/g, ' '); // replace multiple spaces with single

  const firstSpace = content.indexOf(' ');
  if (firstSpace === -1) {
    return [];
  }

  const args = content.substring(firstSpace + 1);
  return args.split(' ');
}
