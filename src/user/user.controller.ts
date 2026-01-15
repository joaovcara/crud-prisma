import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user.response.dto';

@ApiTags('users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários',
    type: [UserResponseDto],
  })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('all')
  @ApiOperation({ summary: 'Encontrar um usuário por ID' })
  @ApiQuery({ name: 'id', type: Number, description: 'ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async findOne(@Query('id') id: number) {
    return await this.userService.findOne(+id);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualizar um usuário' })
  @ApiQuery({ name: 'id', type: Number, description: 'ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async update(@Query('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Deletar um usuário' })
  @ApiQuery({ name: 'id', type: Number, description: 'ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário deletado com sucesso',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async remove(@Query('id') id: number) {
    return await this.userService.remove(+id);
  }
}