import { Controller, Post, Body, Get, Param, Delete, ParseUUIDPipe, ClassSerializerInterceptor, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponse } from './responses';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseInterceptors(ClassSerializerInterceptor, FileInterceptor('avatar'))
  @Post()
  async createUser(@Body() dto: CreateUserDto, @UploadedFile() avatar): Promise<User> {
    const user = await this.userService.save(dto, avatar);
    return new UserResponse(user);
  }

  @Post(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto, @UploadedFile() avatar): Promise<User> {
    const updatedUser = await this.userService.update(dto, id, avatar);
    return new UserResponse(updatedUser);
  }

  @Get()
  findAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':idOrEmail')
  async findOneUser(@Param('idOrEmail') idOrEmail: string): Promise<User> {
    const user = await this.userService.findOne(idOrEmail);
    if (!user) throw new NotFoundException(`User with this email or id: "${idOrEmail}" not found`);
    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.delete(id);
    return new UserResponse(user);
  }
}
