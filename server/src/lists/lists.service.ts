import { Inject, Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { dbExecute } from 'src/common/utils';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schema';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq } from 'drizzle-orm';

@Injectable()
export class ListsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private database: NodePgDatabase<typeof schema>,
  ) {}

  async create(
    projectId: string,
    createListDto: CreateListDto,
    db = this.database,
  ) {
    const [{ ...list }] = await dbExecute(
      db
        .insert(schema.lists)
        .values({ projectId, ...createListDto })
        .returning(),
      'Failed to create list',
    );
    return list;
  }

  async findAll(db = this.database) {
    const lists = await dbExecute(
      db.select().from(schema.lists),
      'Failed to fetch lists',
    );
    return lists;
  }

  async findById(id: string, db = this.database) {
    const [{ ...list }] = await dbExecute(
      db.select().from(schema.lists).where(eq(schema.lists.id, id)),
      'Failed to fetch list',
    );
    return list;
  }

  async update(id: string, updateListDto: UpdateListDto, db = this.database) {
    const [{ ...list }] = await dbExecute(
      db
        .update(schema.lists)
        .set(updateListDto)
        .where(eq(schema.lists.id, id))
        .returning(),
      'Failed to update list',
    );
    return list;
  }

  async remove(id: string, db = this.database) {
    await dbExecute(
      db.delete(schema.lists).where(eq(schema.lists.id, id)),
      'Failed to delete list',
    );
  }
}
