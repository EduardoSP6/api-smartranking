import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    PlayersModule,
    MongooseModule.forRoot(
      'mongodb+srv://eduardo:69q4Ohze3igNRSfA@cluster0.ffeeqf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
