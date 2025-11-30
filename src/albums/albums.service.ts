import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { ArtistsService } from '../artists/artists.service';
import { FavouritesService } from '../favourites/favourites.service';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  constructor(
    private artistsService: ArtistsService,
    private favouritesService: FavouritesService,
  ) {}

  findAll(): Album[] {
    return this.albums;
  }
  findOne(id: string): Album {
    if (!uuidValidate(id)) {
      throw new BadRequestException('AlbumId is invalid (not uuid)');
    }

    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    if (!createAlbumDto.name || createAlbumDto.year === undefined) {
      throw new BadRequestException('Required fields are missing');
    }

    if (createAlbumDto.year < 0) {
      throw new BadRequestException('Year must be a positive number');
    }

    if (
      createAlbumDto.artistId &&
      !this.artistsService.exists(createAlbumDto.artistId)
    ) {
      throw new BadRequestException('Artist not found');
    }

    const newAlbum: Album = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId || null,
    };

    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    if (!uuidValidate(id)) {
      throw new BadRequestException('AlbumId is invalid (not uuid)');
    }

    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException('Album not found');
    }

    if (updateAlbumDto.year !== undefined && updateAlbumDto.year < 0) {
      throw new BadRequestException('Year must be a positive number');
    }

    if (
      updateAlbumDto.artistId &&
      !this.artistsService.exists(updateAlbumDto.artistId)
    ) {
      throw new BadRequestException('Artist not found');
    }

    const updatedAlbum: Album = {
      ...this.albums[albumIndex],
      ...updateAlbumDto,
    };

    this.albums[albumIndex] = updatedAlbum;
    return updatedAlbum;
  }
  remove(id: string): void {
    if (!uuidValidate(id)) {
      throw new BadRequestException('AlbumId is invalid (not uuid)');
    }

    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException('Album not found');
    }
    this.favouritesService.removeAlbumReferences(id);

    this.albums.splice(albumIndex, 1);
  }
  exists(id: string): boolean {
    return this.albums.some((album) => album.id === id);
  }
  findByArtistId(artistId: string): Album[] {
    return this.albums.filter((album) => album.artistId === artistId);
  }
  removeArtistReferences(artistId: string): void {
    this.albums = this.albums.map((album) =>
      album.artistId === artistId ? { ...album, artistId: null } : album,
    );
  }
}
