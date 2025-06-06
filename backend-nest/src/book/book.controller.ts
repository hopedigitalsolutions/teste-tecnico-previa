import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateBookService } from './services/create-book.service';
import { IBookEntity } from './interfaces/IBookEntity';
import { ReadBooksService } from './services/read-books.service';
import { ReadBookByIdService } from './services/read-bookById.service';
import { DeleteBookService } from './services/delete-book.service';
import { UpdateBookService } from './services/update-book.service';
import { TopBooksService } from './services/get-top-books.service';

@Controller('books')
export class BookController {
    constructor(
        private readonly createBookService : CreateBookService,
        private readonly readBookService: ReadBooksService,
        private readonly readBookByIdService: ReadBookByIdService,
        private readonly deleteBookService: DeleteBookService,
        private readonly updateBookService: UpdateBookService,
        private readonly topBooksService: TopBooksService
    ){}

    @Post("")
    async create(@Body() book: IBookEntity) : Promise<IBookEntity>{
        return this.createBookService.execute(book)
    }
    @Get("")
    async getAll(){
        return this.readBookService.execute()
    }

    @Get('top')
    async getTopBooks(@Query('limit') limit?: string) {
        const limitNumber = parseInt(limit ?? '10');
        return this.topBooksService.execute(limitNumber);
    }
        
    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.readBookByIdService.execute(id);
    }   

    @Patch(':id')
    async update(@Param('id') id: string, @Body() book: Partial<IBookEntity>) {
        return this.updateBookService.execute(id, book);
    }


    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.deleteBookService.execute(id);
  }
}


