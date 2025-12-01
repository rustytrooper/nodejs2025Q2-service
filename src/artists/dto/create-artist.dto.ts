// export class CreateArtistDto {}
import { IsInt, IsString, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsBoolean()
  readonly grammy: boolean;
}
