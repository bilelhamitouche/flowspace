import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import * as schema from '../database/schema';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  async createWorkspace(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @CurrentUser() user: typeof schema.users.$inferSelect,
  ) {
    return this.workspacesService.create(user.id, createWorkspaceDto);
  }

  @Get()
  async findWorkspaces() {
    return this.workspacesService.findAll();
  }

  @Get(':id')
  async findWorkspace(@Param('id') id: string) {
    return this.workspacesService.findById(id);
  }

  @Patch(':id')
  async updateWorkspace(
    @Param('id') id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return this.workspacesService.update(id, updateWorkspaceDto);
  }

  @Delete(':id')
  async removeWorkspace(@Param('id') id: string) {
    return this.workspacesService.remove(id);
  }
}
