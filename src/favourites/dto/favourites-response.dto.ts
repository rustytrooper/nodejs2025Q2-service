import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';
import { Track } from '../../tracks/entities/track.entity';

export class FavouritesResponseDto {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];

  constructor(artists: Artist[], albums: Album[], tracks: Track[]) {
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }
}
