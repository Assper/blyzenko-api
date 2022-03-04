import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose'

export abstract class Repository<T> {
  protected abstract readonly model: Model<T>

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data)
  }

  async getById(id: string): Promise<T> {
    return await this.model.findById(id).lean()
  }

  async updateById(
    id: string,
    data: UpdateQuery<T>,
    options?: QueryOptions
  ): Promise<T> {
    return await this.model.findByIdAndUpdate(id, data, options)
  }

  async findOne(filter: FilterQuery<T>, options?: QueryOptions): Promise<T> {
    return await this.model.findOne(filter, options).lean()
  }

  async find(filter: FilterQuery<T>, options?: QueryOptions): Promise<T[]> {
    return await this.model.find(filter, options).lean()
  }

  async updateOne(
    filter: FilterQuery<T>,
    data: UpdateQuery<T>,
    options?: QueryOptions
  ): Promise<T> {
    return await this.model.findOneAndUpdate(filter, data, options).lean()
  }

  async deleteOne(filter: FilterQuery<T>, options?: QueryOptions): Promise<T> {
    return await this.model.findOneAndDelete(filter, options).lean()
  }

  async replaceOne(
    filter: FilterQuery<T>,
    data: UpdateQuery<T>,
    options?: QueryOptions
  ): Promise<T> {
    return await this.model.findOneAndReplace(filter, data, options).lean()
  }
}
