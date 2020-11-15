import { IScoreboard } from '../../models/scoreboard';

export interface ExportOptions {
  object: any;
  fileName: string;
  label: string;
}

export interface ImportOptions {
  url: string;
}

export interface ImportExportEntities {
  scoreboards: IScoreboard[];
}

export interface IImportExportService<T> {
  importData(options: ImportOptions): Promise<T>;

  exportData(options: ExportOptions): Promise<string>;
}

// Dummy class for DI
export class ImportExportService<T> implements IImportExportService<T> {
  importData(options: ImportOptions): Promise<T> {
    throw new Error();
  }

  exportData(options: ExportOptions): Promise<string> {
    throw new Error();
  }
}
