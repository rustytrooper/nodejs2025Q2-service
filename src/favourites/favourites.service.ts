import { Injectable, NotFoundException, BadRequestException, UnprocessableEntityException } from '@nestjs/common';
import { Favorites, FavoritesResponse } from './entities/favourite.entity';
import { validate as uuidValidate } from 'uuid';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
// import { Artist } from '../artists/entities/artist.entity';
// import { Album } from '../albums/entities/album.entity';
// import { Track } from '../tracks/entities/track.entity';

@Injectable()
export class FavouritesService {
  private favourites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
    private tracksService: TracksService,
  ) {}

  async findAll(): Promise<FavoritesResponse> {
    const artists = this.favourites.artists
      .map(id => this.artistsService.findOne(id))
      .filter(artist => artist !== null);

    const albums = this.favourites.albums
      .map(id => this.albumsService.findOne(id))
      .filter(album => album !== null);

    const tracks = this.favourites.tracks
      .map(id => this.tracksService.findOne(id))
      .filter(track => track !== null);

    return {
      artists,
      albums,
      tracks,
    };
  }

  addTrack(id: string): void {
    if (!uuidValidate(id)) {
      throw new BadRequestException('TrackId is invalid (not uuid)');
    }
    try {
      this.tracksService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Track not found');
      }
      throw error;
    }
    if (this.favourites.tracks.includes(id)) {
      return; 
    }

    this.favourites.tracks.push(id);
  }
  removeTrack(id: string): void {
    if (!uuidValidate(id)) {
      throw new BadRequestException('TrackId is invalid (not uuid)');
    }

    const trackIndex = this.favourites.tracks.indexOf(id);
    if (trackIndex === -1) {
      throw new NotFoundException('Track is not in favorites');
    }

    this.favourites.tracks.splice(trackIndex, 1);
  }

  addAlbum(id: string): void {
    if (!uuidValidate(id)) {
      throw new BadRequestException('AlbumId is invalid (not uuid)');
    }

    try {
      this.albumsService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Album not found');
      }
      throw error;
    }

    if (this.favourites.albums.includes(id)) {
      return; 
    }

    this.favourites.albums.push(id);
  }
  removeAlbum(id: string): void {
    if (!uuidValidate(id)) {
      throw new BadRequestException('AlbumId is invalid (not uuid)');
    }

    const albumIndex = this.favourites.albums.indexOf(id);
    if (albumIndex === -1) {
      throw new NotFoundException('Album is not in favorites');
    }

    this.favourites.albums.splice(albumIndex, 1);
  }

  addArtist(id: string): void {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ArtistId is invalid (not uuid)');
    }

    try {
      this.artistsService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Artist not found');
      }
      throw error;
    }

    if (this.favourites.artists.includes(id)) {
      return; 
    }

    this.favourites.artists.push(id);
  }

  removeArtist(id: string): void {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ArtistId is invalid (not uuid)');
    }

    const artistIndex = this.favourites.artists.indexOf(id);
    if (artistIndex === -1) {
      throw new NotFoundException('Artist is not in favorites');
    }

    this.favourites.artists.splice(artistIndex, 1);
  }

  removeTrackReferences(trackId: string): void {
    const trackIndex = this.favourites.tracks.indexOf(trackId);
    if (trackIndex > -1) {
      this.favourites.tracks.splice(trackIndex, 1);
    }
  }

  removeAlbumReferences(albumId: string): void {
    const albumIndex = this.favourites.albums.indexOf(albumId);
    if (albumIndex > -1) {
      this.favourites.albums.splice(albumIndex, 1);
    }
  }

  removeArtistReferences(artistId: string): void {
    const artistIndex = this.favourites.artists.indexOf(artistId);
    if (artistIndex > -1) {
      this.favourites.artists.splice(artistIndex, 1);
    }
  }
}
