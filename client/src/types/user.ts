export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl: string | null;
  refreshToken: string | null;
  role: "Admin" | "User";
  createdAt: Date;
  updatedAt: Date;
}
