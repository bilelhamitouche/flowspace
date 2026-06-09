import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { dbExecute } from 'src/common/utils';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private database: NodePgDatabase<typeof schema>,
  ) {}

  async create(workspaceId: string, createProjectDto: CreateProjectDto) {
    const [{ ...project }] = await dbExecute(
      this.database
        .insert(schema.projects)
        .values({ workspaceId, ...createProjectDto })
        .returning(),
      'Failed to create project',
    );
    return project;
  }

  async findAll() {
    const projects = await dbExecute(
      this.database.select().from(schema.projects),
      'Failed to fetch projects',
    );
    return projects;
  }

  async findById(id: string) {
    const [{ ...project }] = await dbExecute(
      this.database
        .select()
        .from(schema.projects)
        .where(eq(schema.projects.id, id)),
      'Failed to fetch project',
    );
    return project;
  }

  async findByWorkspaceId(workspaceId: string) {
    const projects = await dbExecute(
      this.database
        .select()
        .from(schema.projects)
        .where(eq(schema.projects.workspaceId, workspaceId)),
      'Failed to fetch projects',
    );
    return projects;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const [{ ...updatedProject }] = await dbExecute(
      this.database
        .update(schema.projects)
        .set(updateProjectDto)
        .where(eq(schema.projects.id, id))
        .returning(),
      'Failed to update project',
    );
    return updatedProject;
  }

  async remove(id: string) {
    await dbExecute(
      this.database.delete(schema.projects).where(eq(schema.projects.id, id)),
      'Failed to delete project',
    );
  }
}
