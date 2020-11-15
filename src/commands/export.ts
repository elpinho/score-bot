import { Command, CommandMessage, Infos } from '@typeit/discord';
import { hasPermission } from '../utils/has-permission';
import { PersistenceContext } from '../persistence/persistence-context';
import { formatDate } from '../utils/format-date';
import { reply } from '../utils/reply';
import { Container } from 'typedi';
import { ImportExportService } from '../services/import-export/import-export-service';

export abstract class Export {
  @Command('export')
  @Infos({ admin: true })
  async export(cmd: CommandMessage) {
    if (!hasPermission(cmd, { values: ['ADMINISTRATOR'] })) {
      return;
    }

    const scoreboardsRepo = PersistenceContext.scoreboards();
    const scoreboards = await scoreboardsRepo.findAll();

    const fileName = `ScoreBot_${formatDate(new Date(), { format: 'DD-MM-YYYY_HH:mm:ss' })}.json`;
    const label = `ScoreBot data from server ${cmd.guild.name} on ${formatDate(new Date())}`;

    try {
      const service = Container.get(ImportExportService);
      const output = await service.export({
        fileName,
        label,
        object: {
          scoreboards,
        },
      });

      reply(cmd, `Exported data to ${output}`);
    } catch (e) {
      reply(cmd, 'Could not export data.');
      console.error(e);
    }
  }
}
