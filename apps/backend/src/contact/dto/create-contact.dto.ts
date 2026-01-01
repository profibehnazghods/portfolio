import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(80)
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  message!: string;
}
