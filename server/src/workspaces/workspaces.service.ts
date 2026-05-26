import { Inject, Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { dbExecute } from 'src/common/utils';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import * as schema from '../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class WorkspacesService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private database: NodePgDatabase<typeof schema>,
  ) {}

  async create(
    ownerId: string,
    createWorkspaceDto: CreateWorkspaceDto,
    db = this.database,
  ) {
    const workspace = await dbExecute(
      db
        .insert(schema.workspaces)
        .values({ ...createWorkspaceDto, ownerId })
        .returning(),
      'Failed to create workspace',
    );
    await dbExecute(
      db
        .insert(schema.workspaceMembers)
        .values({ userId: ownerId, workspaceId: workspace[0].id }),
      'Failed to add member',
    );
    return workspace[0];
  }

  async findAll(db = this.database) {
    const workspaces = await dbExecute(
      db.select().from(schema.workspaces),
      'Failed to fetch workspaces',
    );
    return workspaces;
  }

  async findById(id: string, db = this.database) {
    const workspace = await dbExecute(
      db.select().from(schema.workspaces).where(eq(schema.workspaces.id, id)),
      'Failed to fetch workspace',
    );
    return workspace[0];
  }

  async update(
    id: string,
    updateWorkspaceDto: UpdateWorkspaceDto,
    db = this.database,
  ) {
    const updatedWorkspace = await dbExecute(
      db
        .update(schema.workspaces)
        .set(updateWorkspaceDto)
        .where(eq(schema.workspaces.id, id)),
      'Failed to update workspace',
    );
    return updatedWorkspace[0];
  }

  async remove(id: string, db = this.database) {
    await dbExecute(
      db.delete(schema.workspaces).where(eq(schema.workspaces.id, id)),
      'Failed to delete workspace',
    );
  }
}
