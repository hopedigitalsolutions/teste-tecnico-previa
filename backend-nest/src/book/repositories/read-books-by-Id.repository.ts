import { Injectable } from "@nestjs/common";
import { IBookEntity } from "../interfaces/IBookEntity";
import { InjectModel } from "@nestjs/mongoose";
import { Book, BookDocument } from "../schema/book.schema";
import { Model } from "mongoose";

@Injectable()
export class ReadBookByIdRepository {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
  ) {}

  async execute(id: string): Promise<IBookEntity | null> {
    return this.bookModel.findById(id).lean();
  }
}