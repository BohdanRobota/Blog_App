import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { User } from "@prisma/client";
import { genSaltSync, hashSync } from 'bcrypt';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService,
    private readonly fileService: FilesService) { }

  async save(user: Partial<User>, avatar?): Promise<User> {
    const fileName = avatar ? await this.fileService.createFile(avatar) : null;
    let { name, email } = user;
    const hashedPassword = this.hashPassword(user.password);
    return this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        avatar: fileName
      }
    })
  }

  async update(user: Partial<User>, id: string, avatar?): Promise<User> {
    const fileName = avatar ? await this.fileService.createFile(avatar) : null;
    let { name } = user;
    return this.prismaService.user.update({
      where: {
        id
      },
      data: {
        name
      }
    })
  }

  findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async findOne(idOrEmail: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        OR: [
          { id: idOrEmail }, { email: idOrEmail }
        ]
      }
    });
  }

  async delete(id: string): Promise<User> {
    await this.checkUserExisting(id);
    const deletedUser = await this.prismaService.user.delete({ where: { id } }).catch(error => {
      throw new Error(error);
    })
    return deletedUser;
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10))
  }

  async checkUserExisting(idOrEmail: string) {
    const currentUser = await this.findOne(idOrEmail);
    if (!currentUser) throw new NotFoundException(`User with id or email: "${idOrEmail}" not found`);
    return currentUser;
  }

}
