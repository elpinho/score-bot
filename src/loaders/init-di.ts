import { Container } from 'typedi';
import { Client } from '@typeit/discord';
import { ImportExportService } from '../services/import-export/import-export-service';
import { ImportExportServiceWeTransfer } from '../services/import-export/import-export-service-wetransfer';

/**
 * Setup dependency injection
 * @param dependencies
 */
export function initDI({ client }) {
  Container.set(Client, client);
  Container.set(ImportExportService, new ImportExportServiceWeTransfer());
}
