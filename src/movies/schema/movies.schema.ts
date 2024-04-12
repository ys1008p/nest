import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Movie extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  year: number;

  @Prop({ type: [String], default: [] })
  genres: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
