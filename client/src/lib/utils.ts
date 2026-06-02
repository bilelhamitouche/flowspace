import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const apiFetch = async (path: string, options?: RequestInit) => {
  let res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    credentials: "include",
    ...options,
  });

  if (res.status === 401) {
    const refresh = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      },
    );
    if (refresh.ok) {
      res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
        credentials: "include",
        ...options,
      });
    } else {
      throw new Error("Unauthorized");
    }
  }

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) throw new Error(data?.message || "Something went wrong");

  return data;
};
