import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user-decorator';
import * as schema from '../database/schema';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';
import { ProjectsService } from 'src/projects/projects.service';

@Controller('workspaces')
export class WorkspacesController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly workspacesService: WorkspacesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createWorkspace(
    @CurrentUser() user: typeof schema.users.$inferSelect,
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ) {
    return this.workspacesService.create(user.id, createWorkspaceDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post(':id/projects')
  async createProject(
    @Param('id') id: string,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.create(id, createProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findWorkspaces(@CurrentUser() user: typeof schema.users.$inferSelect) {
    return this.workspacesService.findByMemberId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findWorkspace(@Param('id') id: string) {
    return this.workspacesService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Get(':id/projects')
  async findWorkspaceProjects(@Param('id') id: string) {
    return this.projectsService.findByWorkspaceId(id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateWorkspace(
    @Param('id') id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return this.workspacesService.update(id, updateWorkspaceDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteWorkspace(@Param('id') id: string) {
    return this.workspacesService.remove(id);
  }
}
