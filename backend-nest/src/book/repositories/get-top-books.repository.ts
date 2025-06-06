import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../schema/book.schema';

@Injectable()
export class GetTopBooksRepository {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<BookDocument>
  ) {}

  async execute(limit = 10) {
    return this.bookModel.aggregate([
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'bookId',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          avgRating: {
            $cond: [
              { $gt: [{ $size: '$reviews' }, 0] },
              { $avg: '$reviews.rating' },
              0,
            ],
          },
          reviewCount: { $size: '$reviews' },
        },
      },
      {
        $sort: { avgRating: -1 },
      },
      {
        $limit: limit,
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          author_name: 1,
          avgRating: 1,
          reviewCount: 1,
        },
      },
    ]);
  }
}