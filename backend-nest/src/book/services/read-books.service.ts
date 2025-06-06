import { Injectable } from "@nestjs/common";
import { ReadBookRepository } from "../repositories/read-books.repository";
import { IBookEntity } from "../interfaces/IBookEntity";

@Injectable()
export class ReadBooksService{
    constructor(
        private readonly readBookRepository: ReadBookRepository,
    ){}
    async execute(): Promise<IBookEntity[]>{
        let books =  this.readBookRepository.execute()
        return books
    }
}