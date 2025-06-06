import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Book } from "src/book/schema/book.schema";

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ collection: 'reviews' }) // <-- força o nome da collection
export class Review {
  @Prop({ required: true })
  comment: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ type: Types.ObjectId, ref: Book.name, required: true })
  bookId: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);