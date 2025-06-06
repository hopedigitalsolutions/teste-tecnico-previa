import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Book, BookDocument } from "../schema/book.schema";
import { Model } from "mongoose";
import { IBookEntity } from "../interfaces/IBookEntity";


@Injectable()
export class CreateBookRepository{
        constructor(
            @InjectModel(Book.name) private bookModel: Model<BookDocument>
        ){}

        async execute(book: IBookEntity):Promise<IBookEntity>{
            const createdBook = new this.bookModel(book);
            await createdBook.save();
            return createdBook.toObject()
        }

}