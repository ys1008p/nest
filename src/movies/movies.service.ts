import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';
import { UpdateMovieDto } from 'src/movies/dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
  ) {}

  async getAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async getOne(id: string): Promise<Movie> {
    const movie = await this.movieModel.findById(id).exec();
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  async deleteOne(id: string): Promise<Movie> {
    await this.getOne(id);
    return this.movieModel.findByIdAndDelete(id).exec();
  }

  async create(movieData: CreateMovieDto): Promise<Movie> {
    const createdMovie = new this.movieModel(movieData);
    return createdMovie.save();
  }

  async update(id: string, updateData: UpdateMovieDto): Promise<Movie> {
    await this.getOne(id);
    return this.movieModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }
}
