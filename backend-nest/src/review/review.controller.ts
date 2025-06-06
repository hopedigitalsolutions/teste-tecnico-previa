import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateReviewService } from './service/create-review.service';
import { IReviewEntity } from './interfaces/IReviewEntity';
import { Review } from './schema/review.schema';
import { ReadReviewByBookIdService } from './service/read-reviews-by-book-id.service';

@Controller('review')
export class ReviewController {
    constructor(
        private readonly createReviewService: CreateReviewService,
        private readonly readReviewByBookIdService: ReadReviewByBookIdService
        
    ){}

    @Post("")
    async postReview(@Body() review: IReviewEntity):Promise<Review> {
        return await this.createReviewService.execute(review)
    }

    @Get(':bookId')
    async getReviewsByBookId(@Param('bookId') bookId: string): Promise<IReviewEntity[]> {
        return this.readReviewByBookIdService.getReviewsByBookId(bookId);
    }
}