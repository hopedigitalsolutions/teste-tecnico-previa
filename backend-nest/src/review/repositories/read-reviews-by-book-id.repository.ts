import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from '../schema/review.schema';
import { IReviewEntity } from '../interfaces/IReviewEntity';

@Injectable()
export class ReviewByBookIdRepository {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}


  async findByBookId(bookId: string): Promise<IReviewEntity[]> {
    const objectId = new Types.ObjectId(bookId);
    const reviews = await this.reviewModel.find({ bookId: objectId }).exec();
    return reviews.map(review => ({
      _id: review._id.toString(),
      comment: review.comment,
      rating: review.rating,
      bookId: review.bookId.toString(),
    }));
  }
}