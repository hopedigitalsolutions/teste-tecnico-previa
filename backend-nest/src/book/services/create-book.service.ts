import { Injectable } from "@nestjs/common";
import { CreateBookRepository } from "../repositories/create-book.repository";
import { IBookEntity } from "../interfaces/IBookEntity";
@Injectable()
export class CreateBookService{
    constructor(
        private readonly createBookRepository: CreateBookRepository,
    ){}

    async execute(book: IBookEntity): Promise<IBookEntity>{
        let newBook = await this.createBookRepository.execute(book)
        return newBook
    }
}