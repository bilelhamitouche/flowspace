import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/utils/apiFetch";
import { queryClient, router } from "@/lib/router";
import type { LoginData, RegisterData } from "@/types/auth";

export const useLoginMutation = () =>
  useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginData) => {
      await apiFetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
    onError: (error) => {
      console.log(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
        refetchType: "all",
      });
      router.navigate({ to: "/dashboard" });
    },
  });

export const useRegisterMutation = () =>
  useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterData) => {
      await apiFetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
    onError: (error) => {
      console.log(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
        refetchType: "all",
      });
      router.navigate({ to: "/dashboard" });
    },
  });
