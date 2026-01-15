import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123456',
  })
  @IsString()
  @MinLength(6)
  password: string;
}