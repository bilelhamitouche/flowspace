import { queryClient, router } from "@/lib/router";
import { apiFetch } from "@/lib/utils";
import type { LoginData, RegisterData } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLoginMutation = () =>
  useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginData) =>
      apiFetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      router.navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

export const useRegisterMutation = () =>
  useMutation({
    mutationKey: ["register"],
    mutationFn: (data: RegisterData) =>
      apiFetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      router.navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

export const useLogoutMutation = () =>
  useMutation({
    mutationKey: ["logout"],
    mutationFn: () =>
      apiFetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      router.navigate({ to: "/auth/login" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
