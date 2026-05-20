export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User";
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
