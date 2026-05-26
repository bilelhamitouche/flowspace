import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schema';
import { dbExecute } from 'src/common/utils';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from 'src/database/database-connection';

@Injectable()
export class TasksService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private database: NodePgDatabase<typeof schema>,
  ) {}

  async create(
    createdBy: string,
    listId: string,
    createTaskDto: CreateTaskDto,
    db = this.database,
  ) {
    const task = dbExecute(
      db
        .insert(schema.tasks)
        .values({ createdBy, listId, ...createTaskDto })
        .returning(),
      'Failed to create task',
    );
    return task[0];
  }

  async findAll(db = this.database) {
    const tasks = dbExecute(
      db.select().from(schema.tasks),
      'Failed to fetch tasks',
    );
    return tasks;
  }

  async findById(id: string, db = this.database) {
    const tasks = dbExecute(
      db.select().from(schema.tasks).where(eq(schema.tasks.id, id)),
      'Failed to fetch task',
    );
    return tasks;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, db = this.database) {
    const updatedTask = dbExecute(
      db.update(schema.tasks).set(updateTaskDto).where(eq(schema.tasks.id, id)),
      'Failed to update task',
    );
    return updatedTask[0];
  }

  async remove(id: string, db = this.database) {
    await dbExecute(
      db.delete(schema.tasks).where(eq(schema.tasks.id, id)),
      'Failed to update task',
    );
  }
}
