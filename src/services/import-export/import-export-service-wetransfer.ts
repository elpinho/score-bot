import { IImportExportService, ExportOptions, ImportOptions } from './import-export-service';
import { downloadPipe, upload } from 'wetransfert';
import toString from 'stream-to-string';

export class ImportExportServiceWeTransfer<T> implements IImportExportService<T> {
  async import(options: ImportOptions): Promise<any> {
    const result = await downloadPipe(options.url);
    const jsonString = await toString(result);
    return JSON.parse(jsonString);
  }

  async export(options: ExportOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      upload(
        '',
        '',
        [
          {
            name: options.fileName,
            buffer: Buffer.from(JSON.stringify(options.object, undefined, 2)),
          },
        ],
        options.label
      )
        .on('end', (end) => resolve(end.shortened_url))
        .on('error', (error) => reject(error));
    });
  }
}
