// export class CreateAlbumDto {}
import { IsInt, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsInt()
  readonly year: number;

  @IsString()
  readonly artistId: string;
}
