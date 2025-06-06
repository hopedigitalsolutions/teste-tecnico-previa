import { Injectable } from "@nestjs/common";
import { ReadBookByIdRepository} from "../repositories/read-books-by-Id.repository";
import { IBookEntity } from "../interfaces/IBookEntity";


@Injectable()
export class ReadBookByIdService{
    constructor(
        private readonly readBookByIdRepository: ReadBookByIdRepository,
    ){}
    async execute(id: string):Promise<IBookEntity | null>{
        let book = await this.readBookByIdRepository.execute(id)
        return book
    }
}