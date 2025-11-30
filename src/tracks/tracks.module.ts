import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { FavouritesModule } from 'src/favourites/favourites.module';

@Module({
  imports: [ArtistsModule, AlbumsModule, FavouritesModule],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
