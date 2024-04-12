import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './schema/movies.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
  ],
  controllers: [MoviesController],
  //providers가 MoviesService의 모든 것을 import하여 controller에게 전달,
  //타입을 추가하였을 뿐이지만 작동가능하게 해줌
  //dependency injection이라고 부름
  providers: [MoviesService],
})
export class MoviesModule {}
