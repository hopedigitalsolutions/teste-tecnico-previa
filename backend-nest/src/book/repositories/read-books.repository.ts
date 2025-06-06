 
 import { Injectable } from "@nestjs/common";
 import { IBookEntity } from "../interfaces/IBookEntity";
 import { InjectModel } from "@nestjs/mongoose";
 import { Book, BookDocument } from "../schema/book.schema";
 import { Model } from "mongoose";
 
 @Injectable()
 export class ReadBookRepository {
   constructor(
     @InjectModel(Book.name) private bookModel: Model<BookDocument>,
   ) {}
 
    async execute(): Promise<IBookEntity[]> {
        return this.bookModel.find().lean();
   }
 }
