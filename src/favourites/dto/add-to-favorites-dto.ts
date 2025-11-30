export class AddToFavouritesDto {}
export class AddToFavouritesResponseDto {
  message: string;

  constructor(type: 'artist' | 'album' | 'track') {
    this.message = `${type.charAt(0).toUpperCase() + type.slice(1)} added to favorites`;
  }
}
