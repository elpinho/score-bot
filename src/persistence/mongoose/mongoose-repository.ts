import { FindOptions, IRepository } from '../interfaces/repository';
import { Document, Model } from 'mongoose';

export class MongooseRepository<T extends Document, K> implements IRepository<T, K> {
  constructor(protected model: Model<T>) {}

  async add(doc: Partial<T>): Promise<T | undefined> {
    return this.model.create(doc as any);
  }

  async findById(id: K): Promise<T | undefined> {
    return this.model.findById(id).lean();
  }

  async findAll(options?: FindOptions): Promise<T[]> {
    let findCall = this.model.find();
    if (options && options.sort) {
      findCall = findCall.sort(options.sort);
    }

    return findCall.lean();
  }

  async deleteById(id: K): Promise<T | undefined> {
    return this.model.findByIdAndDelete(id).lean();
  }
}
