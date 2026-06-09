import { queryClient, router } from "@/lib/router";
import { apiFetch } from "@/lib/utils";
import type { LoginData, RegisterData } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLoginMutation = () =>
  useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginData) =>
      apiFetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["me"],
        exact: false,
      });
      await router.invalidate();
      await router.navigate({ to: "/workspaces" });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

export const useRegisterMutation = () =>
  useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterData) =>
      apiFetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["me"],
        exact: true,
      });
      await router.invalidate();
      await router.navigate({ to: "/workspaces" });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

export const useLogoutMutation = () =>
  useMutation({
    mutationKey: ["logout"],
    mutationFn: async () =>
      apiFetch("/api/auth/logout", {
        method: "POST",
      }),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["me"],
        exact: true,
      });
      await router.invalidate();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
