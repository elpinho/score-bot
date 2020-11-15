import { MongooseRepositoryFactory } from './mongoose/mongoose-repository-factory';
import { IRepositoryFactory } from './interfaces/repository-factory';
import { IScoreboardRepository } from './interfaces/repositories/scoreboard-repository';

export abstract class PersistenceContext {
  private static _repositoryFactory: IRepositoryFactory;

  static scoreboards(): IScoreboardRepository {
    return this._getRepositoryFactory().scoreboards();
  }

  private static _getRepositoryFactory() {
    if (!PersistenceContext._repositoryFactory) {
      PersistenceContext._repositoryFactory = new MongooseRepositoryFactory();
    }

    return PersistenceContext._repositoryFactory;
  }
}
