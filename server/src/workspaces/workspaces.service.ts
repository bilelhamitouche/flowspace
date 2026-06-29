import { Inject, Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { dbExecute } from 'src/common/utils';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schema';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from 'src/database/database-connection';

@Injectable()
export class WorkspacesService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private database: NodePgDatabase<typeof schema>,
  ) {}
  async create(ownerId: string, createWorkspaceDto: CreateWorkspaceDto) {
    const workspace = await dbExecute(
      this.database.transaction(async (tx) => {
        const workspace = tx
          .insert(schema.workspaces)
          .values({ ...createWorkspaceDto, ownerId })
          .returning();
        tx.insert(schema.workspaceMembers).values({
          userId: ownerId,
          workspaceId: workspace[0].id,
        });
        return workspace;
      }),
      'Failed to create workspace',
    );
    return workspace[0];
  }

  async findAll() {
    const workspaces = await dbExecute(
      this.database.select().from(schema.workspaces),
      'Failed to fetch workspaces',
    );
    return workspaces;
  }

  async findById(id: string) {
    const workspace = await dbExecute(
      this.database
        .select()
        .from(schema.workspaces)
        .where(eq(schema.workspaces.id, id)),
      'Failed to fetch workspace',
    );
    return workspace[0];
  }

  async update(id: string, updateWorkspaceDto: UpdateWorkspaceDto) {
    const updatedWorkspace = await dbExecute(
      this.database
        .update(schema.workspaces)
        .set(updateWorkspaceDto)
        .where(eq(schema.workspaces.id, id)),
      'Failed to update workspace',
    );
    return updatedWorkspace[0];
  }

  async remove(id: string) {
    await dbExecute(
      this.database
        .delete(schema.workspaces)
        .where(eq(schema.workspaces.id, id)),
      'Failed to delete workspace',
    );
  }
}
