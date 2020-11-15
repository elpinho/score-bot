import { IScoreboardRepository } from './repositories/scoreboard-repository';

export interface IRepositoryFactory {
  scoreboards(): IScoreboardRepository;
}
