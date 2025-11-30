import { Injectable } from '@nestjs/common';
import { User } from './users/entities/user.entity';
import { Artist } from './artists/entities/artist.entity';
import { Track } from './tracks/entities/track.entity';
import { Album } from './albums/entities/album.entity';
import { Favourite } from './favourites/entities/favourite.entity';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  private db: {
    users: User[];
    artists: Artist[];
    tracks: Track[];
    albums: Album[];
    favourites: Favourite;
  } = {
    users: [],
    artists: [],
    tracks: [],
    albums: [],
    favourites: {
      artists: [],
      albums: [],
      tracks: [],
    },
  };

  getDB() {
    return this.db;
  }
}
