import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
    @Prop({required: true})
    name: string;
    
    @Prop({required: true})
    description: string;

    @Prop({required: true})
    author_name: string ;
}

export const BookSchema = SchemaFactory.createForClass(Book)
