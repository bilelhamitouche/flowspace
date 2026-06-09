export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User";
  avatarUrl: string | null;
  activeWorkspaceId: string;
  createdAt: Date;
  updatedAt: Date;
}
