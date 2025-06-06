import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { CreateBookService } from './services/create-book.service';
import { CreateBookRepository } from './repositories/create-book.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schema/book.schema';
import { ReadBooksService } from './services/read-books.service';
import { ReadBookByIdService } from './services/read-bookById.service';
import { ReadBookByIdRepository } from './repositories/read-books-by-Id.repository';
import { ReadBookRepository } from './repositories/read-books.repository';
import { DeleteBookService } from './services/delete-book.service';
import { DeleteBookRepository } from './repositories/delete-book.repository';
import { GetTopBooksRepository } from './repositories/get-top-books.repository';
import { TopBooksService } from './services/get-top-books.service';
import { Review, ReviewSchema } from 'src/review/schema/review.schema';
import { UpdateBookService } from './services/update-book.service';
import { UpdateBookRepository } from './repositories/update-book.repository';

@Module({ imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Review.name, schema: ReviewSchema } 
    ]),
  ],
  controllers: [BookController],
  providers: [CreateBookService,
     ReadBooksService, DeleteBookService, ReadBookByIdService, UpdateBookService, TopBooksService , ReadBookByIdRepository, DeleteBookRepository ,ReadBookRepository, 
     CreateBookRepository, GetTopBooksRepository, UpdateBookRepository]
})
export class BookModule {}
