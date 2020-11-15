import { IRepositoryFactory } from '../interfaces/repository-factory';
import { IScoreboardRepository } from '../interfaces/repositories/scoreboard-repository';
import { ScoreboardRepositoryMongoose } from './repositories/scoreboard-repository-mongoose';

export class MongooseRepositoryFactory implements IRepositoryFactory {
  scoreboards(): IScoreboardRepository {
    return new ScoreboardRepositoryMongoose();
  }
}
