export interface Workspace {
  id: string;
  ownerId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkspaceData {
  name: string;
}
