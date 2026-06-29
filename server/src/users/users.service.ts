import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schema';
import { eq } from 'drizzle-orm';
import { dbExecute } from 'src/common/utils';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/common/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private database: NodePgDatabase<typeof schema>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      SALT_ROUNDS,
    );
    const createdUser = await dbExecute(
      this.database
        .insert(schema.users)
        .values({ ...createUserDto, password: hashedPassword })
        .returning(),
      'Failed to create user',
    );
    return createdUser[0];
  }

  async findAll() {
    const users = await dbExecute(
      this.database
        .select({
          id: schema.users.id,
          name: schema.users.name,
          email: schema.users.email,
          avatarUrl: schema.users.avatarUrl,
          role: schema.users.role,
          createdAt: schema.users.createdAt,
          updatedAt: schema.users.updatedAt,
        })
        .from(schema.users),
      'Failed to fetch users',
    );
    return users;
  }

  async findById(id: string) {
    const result = await dbExecute(
      this.database.select().from(schema.users).where(eq(schema.users.id, id)),
      'Failed to fetch user',
    );
    return result[0];
  }

  async findByEmail(email: string) {
    const result = await dbExecute(
      this.database
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, email)),
      'Failed to fetch user',
    );
    return result[0];
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await dbExecute(
      this.database
        .update(schema.users)
        .set(updateUserDto)
        .where(eq(schema.users.id, id))
        .returning(),
      'Failed to update user',
    );
    return updatedUser[0];
  }

  async remove(id: string) {
    await dbExecute(
      this.database.delete(schema.users).where(eq(schema.users.id, id)),
      'Failed to delete user',
    );
  }
}
