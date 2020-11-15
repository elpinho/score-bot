export interface FindOptions {
  sort?: any;
}

export interface IRepository<T, K> {
  add(doc: Partial<T>): Promise<T | undefined>;

  findById(id: K): Promise<T | undefined>;

  deleteById(id: K): Promise<T | undefined>;

  findAll(options?: FindOptions): Promise<T[]>;
}
