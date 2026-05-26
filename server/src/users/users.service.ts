import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schema';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { dbExecute } from 'src/common/utils';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/common/constants/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private database: NodePgDatabase<typeof schema>,
  ) {}

  async create(createUserDto: CreateUserDto, db = this.database) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      SALT_ROUNDS,
    );
    const user = await dbExecute(
      db
        .insert(schema.users)
        .values({ ...createUserDto, password: hashedPassword })
        .returning(),
      'Failed to create user',
    );
    return user[0];
  }

  async findAll(db = this.database) {
    const users = await dbExecute(
      db
        .select({
          id: schema.users.id,
          name: schema.users.name,
          email: schema.users.email,
          role: schema.users.role,
          avatarUrl: schema.users.avatarUrl,
          createdAt: schema.users.createdAt,
          updatedAt: schema.users.updatedAt,
        })
        .from(schema.users),
      'Failed to fetch users',
    );
    return users;
  }

  async findById(id: string, db = this.database) {
    const user = await dbExecute(
      db
        .select({
          id: schema.users.id,
          name: schema.users.name,
          email: schema.users.email,
          role: schema.users.role,
          avatarUrl: schema.users.avatarUrl,
          refreshToken: schema.users.refreshToken,
          createdAt: schema.users.createdAt,
          updatedAt: schema.users.updatedAt,
        })
        .from(schema.users)
        .where(eq(schema.users.id, id)),
      'Failed to find user',
    );
    if (!user) {
      throw new NotFoundException();
    }
    return user[0];
  }

  async findByEmail(email: string, db = this.database) {
    const user = await dbExecute(
      db.select().from(schema.users).where(eq(schema.users.email, email)),
      'Failed to find user',
    );
    if (!user) {
      throw new NotFoundException();
    }
    return user[0];
  }

  async update(id: string, updateUserDto: UpdateUserDto, db = this.database) {
    const updatedUser = await dbExecute(
      db
        .update(schema.users)
        .set(updateUserDto)
        .where(eq(schema.users.id, id))
        .returning(),
      'Failed to update user',
    );
    return updatedUser[0];
  }

  async remove(id: string, db = this.database) {
    await dbExecute(
      db.delete(schema.users).where(eq(schema.users.id, id)),
      'Failed to delete user',
    );
  }
}
