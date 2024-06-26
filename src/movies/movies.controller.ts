import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Promise<Movie[]> {
    return this.moviesService.getAll();
  }

  // :id와 search의 순서가 바뀌면 search를 id로 판단하여 search가 정상적으로 작동하지 않는다.
  // @Get('search')
  // search(@Query() query) {
  //   return query;
  // }

  @Get(':id')
  getOne(@Param('id') movieId: string): Promise<Movie> {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: string) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
