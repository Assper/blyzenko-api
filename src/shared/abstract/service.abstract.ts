import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import { Repository } from './repository.abstract'

export abstract class Service<T extends Repository<K>, K> {
  protected abstract readonly repository: T

  async create(data: Partial<K>): Promise<K> {
    return await this.repository.create(data)
  }

  async getById(id: string): Promise<K> {
    return await this.repository.getById(id)
  }

  async findOne(filter: FilterQuery<K>, options?: QueryOptions): Promise<K> {
    return await this.repository.findOne(filter, options)
  }

  async find(filter: FilterQuery<K>, options?: QueryOptions): Promise<K[]> {
    return await this.repository.find(filter, options)
  }

  async updateById(
    id: string,
    data: UpdateQuery<K>,
    options?: QueryOptions
  ): Promise<K> {
    return await this.repository.updateById(id, data, options)
  }

  async updateOne(
    filter: FilterQuery<K>,
    data: UpdateQuery<K>,
    options?: QueryOptions
  ): Promise<K> {
    return await this.repository.updateOne(filter, data, options)
  }

  async deleteOne(filter: FilterQuery<K>, options?: QueryOptions): Promise<K> {
    return await this.repository.deleteOne(filter, options)
  }

  async replaceOne(
    filter: FilterQuery<K>,
    data: UpdateQuery<K>,
    options?: QueryOptions
  ): Promise<K> {
    return await this.repository.replaceOne(filter, data, options)
  }
}
