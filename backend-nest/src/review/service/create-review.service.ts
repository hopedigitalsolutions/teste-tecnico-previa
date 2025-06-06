import { Injectable } from "@nestjs/common";
import { CreateReviewRepository } from "../repositories/create-review.repository";
import { IReviewEntity } from "../interfaces/IReviewEntity";
import { Review } from "../schema/review.schema";
@Injectable()
export class CreateReviewService{
    constructor(
        private readonly createReviewRepository: CreateReviewRepository,
    ){}

    async execute(review: IReviewEntity): Promise<Review>{
        let newReview = await this.createReviewRepository.execute(review)
        return newReview
    }
}