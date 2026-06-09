import { Inject, Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { dbExecute } from 'src/common/utils';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import * as schema from '../database/schema';
import { and, eq } from 'drizzle-orm';

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
    const [{ ...workspace }] = await dbExecute(
      db
        .insert(schema.workspaces)
        .values({ ...createWorkspaceDto, ownerId })
        .returning(),
      'Failed to create workspace',
    );
    await this.addMember(ownerId, workspace.id);
    return workspace;
  }

  async addMember(memberId: string, workspaceId: string, db = this.database) {
    await dbExecute(
      db
        .insert(schema.workspaceMembers)
        .values({ userId: memberId, workspaceId }),
      'Failed to add member',
    );
  }

  async findAll(db = this.database) {
    const workspaces = await dbExecute(
      db.select().from(schema.workspaces),
      'Failed to fetch workspaces',
    );
    return workspaces;
  }

  async findById(id: string, db = this.database) {
    const [{ ...workspace }] = await dbExecute(
      db.select().from(schema.workspaces).where(eq(schema.workspaces.id, id)),
      'Failed to fetch workspace',
    );
    return workspace;
  }

  async findByMemberId(memberId: string, db = this.database) {
    const workspaces = await dbExecute(
      db
        .select({
          id: schema.workspaces.id,
          name: schema.workspaces.name,
          ownerId: schema.workspaces.ownerId,
          createdAt: schema.workspaces.createdAt,
          updatedAt: schema.workspaces.updatedAt,
        })
        .from(schema.workspaces)
        .leftJoin(
          schema.workspaceMembers,
          eq(schema.workspaces.id, schema.workspaceMembers.workspaceId),
        )
        .where(eq(schema.workspaceMembers.userId, memberId)),
      'Failed to fetch workspaces',
    );
    return workspaces;
  }

  async update(
    id: string,
    updateWorkspaceDto: UpdateWorkspaceDto,
    db = this.database,
  ) {
    const [{ ...updatedWorkspace }] = await dbExecute(
      db
        .update(schema.workspaces)
        .set(updateWorkspaceDto)
        .where(eq(schema.workspaces.id, id))
        .returning(),
      'Failed to update workspace',
    );
    return updatedWorkspace;
  }

  async changeMemberRole(
    id: string,
    workspaceId: string,
    role: 'Member' | 'Owner',
    db = this.database,
  ) {
    const [{ ...membership }] = await dbExecute(
      db
        .update(schema.workspaceMembers)
        .set({ role })
        .where(
          and(
            eq(schema.workspaceMembers.userId, id),
            eq(schema.workspaceMembers.workspaceId, workspaceId),
          ),
        )
        .returning(),
      'Failed to change role',
    );
    return membership;
  }

  async remove(id: string, db = this.database) {
    await dbExecute(
      db.delete(schema.workspaces).where(eq(schema.workspaces.id, id)),
      'Failed to delete workspace',
    );
  }
}
