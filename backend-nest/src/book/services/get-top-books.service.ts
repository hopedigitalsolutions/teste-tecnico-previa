import { Injectable } from '@nestjs/common';
import { GetTopBooksRepository } from '../repositories/get-top-books.repository';

@Injectable()
export class TopBooksService {
  constructor(
    private readonly getTopBooksRepository: GetTopBooksRepository,
  ) {}

  async execute(limit: number = 10) {
    return this.getTopBooksRepository.execute(limit);
  }
}