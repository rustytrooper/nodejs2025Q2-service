import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { FavouritesService } from '../favourites/favourites.service';

@Injectable()
export class TracksService {
  constructor(
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
    private favouritesService: FavouritesService,
  ) {}
  private tracks: Track[] = [];

  findAll(): Track[] {
    return this.tracks;
  }
  findOne(id: string): Track {
    if (!uuidValidate(id)) {
      throw new BadRequestException('TrackId is invalid (not uuid)');
    }

    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }
  create(createTrackDto: CreateTrackDto): Track {
    if (!createTrackDto.name || createTrackDto.duration === undefined) {
      throw new BadRequestException('Required fields are missing');
    }

    if (
      createTrackDto.artistId &&
      !this.artistsService.exists(createTrackDto.artistId)
    ) {
      throw new BadRequestException('Artist not found');
    }

    if (
      createTrackDto.albumId &&
      !this.albumsService.exists(createTrackDto.albumId)
    ) {
      throw new BadRequestException('Album not found');
    }

    const newTrack: Track = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId || null,
      albumId: createTrackDto.albumId || null,
      duration: createTrackDto.duration,
    };

    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    if (!uuidValidate(id)) {
      throw new BadRequestException('TrackId is invalid (not uuid)');
    }

    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new NotFoundException('Track not found');
    }

    if (
      updateTrackDto.artistId &&
      !this.artistsService.exists(updateTrackDto.artistId)
    ) {
      throw new BadRequestException('Artist not found');
    }

    if (
      updateTrackDto.albumId &&
      !this.albumsService.exists(updateTrackDto.albumId)
    ) {
      throw new BadRequestException('Album not found');
    }

    const updatedTrack: Track = {
      ...this.tracks[trackIndex],
      ...updateTrackDto,
    };

    this.tracks[trackIndex] = updatedTrack;
    return updatedTrack;
  }

  remove(id: string): void {
    if (!uuidValidate(id)) {
      throw new BadRequestException('TrackId is invalid (not uuid)');
    }

    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException('Track not found');
    }

    this.favouritesService.removeTrackReferences(id);

    this.tracks.splice(trackIndex, 1);
  }

  findByArtistId(artistId: string): Track[] {
    return this.tracks.filter((track) => track.artistId === artistId);
  }

  findByAlbumId(albumId: string): Track[] {
    return this.tracks.filter((track) => track.albumId === albumId);
  }

  removeArtistReferences(artistId: string): void {
    this.tracks = this.tracks.map((track) =>
      track.artistId === artistId ? { ...track, artistId: null } : track,
    );
  }

  removeAlbumReferences(albumId: string): void {
    this.tracks = this.tracks.map((track) =>
      track.albumId === albumId ? { ...track, albumId: null } : track,
    );
  }
}
