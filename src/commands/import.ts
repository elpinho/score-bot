import { Command, CommandMessage, Infos } from '@typeit/discord';
import { hasPermission } from '../utils/has-permission';
import {
  IImportExportService,
  ImportExportEntities,
  ImportExportService,
} from '../services/import-export/import-export-service';
import { Container } from 'typedi';
import { PersistenceContext } from '../persistence/persistence-context';
import { reply } from '../utils/reply';

interface ImportArgs {
  url: string;
}

export class Import {
  @Command('import :url')
  @Infos({ admin: true })
  async import(cmd: CommandMessage<ImportArgs>) {
    if (!hasPermission(cmd, { values: ['ADMINISTRATOR'] })) {
      return;
    }

    try {
      await Import._import(cmd);
    } catch (e) {
      reply(cmd, 'Failed to import');
      console.error(e);
    }
  }

  private static async _import(cmd: CommandMessage<ImportArgs>) {
    const service: IImportExportService<ImportExportEntities> = Container.get(ImportExportService);

    const entities = await service.import({
      url: cmd.args.url,
    });

    let output = '';
    const scoreboardRepo = PersistenceContext.scoreboards();
    for (const scoreboard of entities.scoreboards) {
      try {
        await scoreboardRepo.add(scoreboard);
      } catch (e) {
        output += `Could not create scoreboard **${scoreboard.name}**.\n`;
      }
    }

    output += 'Imported the data';
    reply(cmd, output);
  }
}
