import { MongooseRepository } from '../mongoose-repository';
import { IScoreboard } from '../../../models/scoreboard';
import { IScoreboardRepository } from '../../interfaces/repositories/scoreboard-repository';
import { Document } from 'mongoose';
import { scoreboardModel } from '../models/scoreboard-model';

const scoreboardByNameCondition = (name: string) => ({ name: new RegExp(`^${name}$`, 'i') });

export class ScoreboardRepositoryMongoose
  extends MongooseRepository<IScoreboard & Document, any>
  implements IScoreboardRepository {
  constructor() {
    super(scoreboardModel);
  }

  async findLatest(): Promise<IScoreboard | undefined> {
    return scoreboardModel.findOne().sort({ createdAt: -1 }).lean();
  }

  async findByName(name: string): Promise<IScoreboard | undefined> {
    return scoreboardModel.findOne(scoreboardByNameCondition(name)).lean();
  }

  async deleteByName(name: string): Promise<IScoreboard | undefined> {
    return scoreboardModel.findOneAndDelete(scoreboardByNameCondition(name)).lean();
  }

  async update(scoreboard: IScoreboard): Promise<IScoreboard | undefined> {
    return scoreboardModel.findOneAndUpdate(scoreboardByNameCondition(scoreboard.name), scoreboard);
  }
}
