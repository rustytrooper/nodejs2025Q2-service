import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { FavouritesService } from '../favourites/favourites.service';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  constructor(private favouritesService: FavouritesService) {}
  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ArtistId is invalid (not uuid)');
    }

    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }
  create(createArtistDto: CreateArtistDto): Artist {
    if (!createArtistDto.name || createArtistDto.grammy === undefined) {
      throw new BadRequestException('Required fields are missing');
    }

    const newArtist: Artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };

    this.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ArtistId is invalid (not uuid)');
    }

    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException('Artist not found');
    }

    const updatedArtist: Artist = {
      ...this.artists[artistIndex],
      ...updateArtistDto,
    };

    this.artists[artistIndex] = updatedArtist;
    return updatedArtist;
  }
  remove(id: string): void {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ArtistId is invalid (not uuid)');
    }

    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException('Artist not found');
    }
    this.favouritesService.removeArtistReferences(id);

    this.artists.splice(artistIndex, 1);
  }

  exists(id: string): boolean {
    return this.artists.some((artist) => artist.id === id);
  }
}
