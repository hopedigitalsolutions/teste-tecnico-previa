import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Review, ReviewDocument } from "../schema/review.schema";
import { Model, Types } from "mongoose";
import { IReviewEntity } from "../interfaces/IReviewEntity";

@Injectable()
export class CreateReviewRepository {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    ) {}

    async execute(reviewEntity: IReviewEntity): Promise<Review> {
        const review = new this.reviewModel({
        ...reviewEntity,
        bookId: new Types.ObjectId(reviewEntity.bookId),
        });
        return await review.save();
    }
}