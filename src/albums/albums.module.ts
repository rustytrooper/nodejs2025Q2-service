import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { ArtistsModule } from 'src/artists/artists.module';
import { FavouritesModule } from 'src/favourites/favourites.module';

@Module({
  imports: [ArtistsModule, FavouritesModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
