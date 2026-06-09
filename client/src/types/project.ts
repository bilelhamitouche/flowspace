export interface Project {
  id: string;
  name: string;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectData {
  name: string;
  workspaceId: string;
}
