import { IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly login: string;

  @IsString()
  readonly password: string;

  @IsInt()
  readonly version: number;

  @IsInt()
  readonly createdAt: number;

  @IsInt()
  readonly updatedAt: number;
}
