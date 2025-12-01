// export class CreateTrackDto {}
import { IsInt, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly artistId: string;

  @IsString()
  readonly albumId: string;

  @IsString()
  readonly createdAt: string;

  @IsInt()
  readonly duration: number;
}
