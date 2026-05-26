import { Inject, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { dbExecute } from 'src/common/utils';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class BoardsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private database: NodePgDatabase<typeof schema>,
  ) {}

  async create(workspaceId: string, createBoardDto: CreateBoardDto) {
    const board = await dbExecute(
      this.database
        .insert(schema.boards)
        .values({ workspaceId, ...createBoardDto }),
      'Failed to create board',
    );
    return board[0];
  }

  async findAll() {
    const boards = await dbExecute(
      this.database.select().from(schema.users),
      'Failed to fetch boards',
    );
    return boards;
  }

  async findById(id: string) {
    const board = await dbExecute(
      this.database.select().from(schema.users).where(eq(schema.boards.id, id)),
      'Failed to fetch board',
    );
    return board[0];
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const updatedBoard = await dbExecute(
      this.database
        .update(schema.boards)
        .set(updateBoardDto)
        .where(eq(schema.boards.id, id)),
      'Failed to update board',
    );
    return updatedBoard[0];
  }

  async remove(id: string) {
    await dbExecute(
      this.database.delete(schema.boards).where(eq(schema.boards.id, id)),
      'Failed to delete board',
    );
  }
}
