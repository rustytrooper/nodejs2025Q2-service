import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { AddToFavouritesResponseDto } from './dto/add-to-favorites-dto';
import { FavouritesResponseDto } from './dto/favourites-response.dto';

@Controller('favs')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Get()
  async findAll(): Promise<FavouritesResponseDto> {
    const favourites = await this.favouritesService.findAll();
    return new FavouritesResponseDto(
      favourites.artists,
      favourites.albums,
      favourites.tracks,
    );
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param('id') id: string): AddToFavouritesResponseDto {
    this.favouritesService.addTrack(id);
    return new AddToFavouritesResponseDto('track');
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id') id: string) {
    this.favouritesService.removeTrack(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param('id') id: string): AddToFavouritesResponseDto {
    this.favouritesService.addAlbum(id);
    return new AddToFavouritesResponseDto('album');
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id') id: string) {
    this.favouritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param('id') id: string): AddToFavouritesResponseDto {
    this.favouritesService.addArtist(id);
    return new AddToFavouritesResponseDto('artist');
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id') id: string) {
    this.favouritesService.removeArtist(id);
  }
}
