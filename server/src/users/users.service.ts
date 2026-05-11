import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schema';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from 'src/database/database-connection';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private database: NodePgDatabase<typeof schema>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.database
      .insert(schema.users)
      .values(createUserDto)
      .returning();
    return user;
  }

  async findAll() {
    const users = await this.database.select().from(schema.users);
    return users;
  }

  async findById(id: string) {
    const user = await this.database
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.database
      .update(schema.users)
      .set(updateUserDto)
      .where(eq(schema.users.id, id))
      .returning();
    return updatedUser;
  }

  async remove(id: string) {
    await this.database.delete(schema.users).where(eq(schema.users.id, id));
  }
}
