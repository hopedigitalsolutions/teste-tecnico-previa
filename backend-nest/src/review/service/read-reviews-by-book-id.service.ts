import { Injectable } from '@nestjs/common';
import { ReviewByBookIdRepository } from '../repositories/read-reviews-by-book-id.repository';
import { IReviewEntity } from '../interfaces/IReviewEntity';
@Injectable()
export class ReadReviewByBookIdService {
  constructor(private readonly reviewByBookIdRepository: ReviewByBookIdRepository) {}

  async getReviewsByBookId(bookId: string): Promise<IReviewEntity[]> {
    return this.reviewByBookIdRepository.findByBookId(bookId);
  }
}