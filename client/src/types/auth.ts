export type AuthState = "Unauthenticated" | "Authenticated" | "Offline";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
