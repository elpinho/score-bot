import { IRepository } from '../repository';
import { IScoreboard } from '../../../models/scoreboard';

export interface IScoreboardRepository extends IRepository<IScoreboard, any> {
  findLatest(): Promise<IScoreboard | undefined>;

  findByName(name: string): Promise<IScoreboard | undefined>;

  deleteByName(name: string): Promise<IScoreboard | undefined>;

  update(scoreboard: IScoreboard): Promise<IScoreboard | undefined>;
}
