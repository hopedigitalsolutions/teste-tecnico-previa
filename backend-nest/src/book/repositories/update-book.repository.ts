import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from '../schema/book.schema';
import { Model } from 'mongoose';
import { IBookEntity } from '../interfaces/IBookEntity';

@Injectable()
export class UpdateBookRepository {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>
  ) {}

  async update(id: string, updateData: Partial<IBookEntity>) {
    return this.bookModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }
}