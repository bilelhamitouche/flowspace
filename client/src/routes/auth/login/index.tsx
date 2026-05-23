import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { loginSchema } from "@/zod/auth";
import { useLoginMutation } from "@/api/mutations/auth";

export const Route = createFileRoute("/auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const login = useLoginMutation();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
      onBlur: loginSchema,
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      await login.mutateAsync(value);
    },
  });
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-screen">
      <img src="/flowspace-logo.png" alt="logo image" width="120" />
      <h2 className="text-lg font-medium">Welcome back to Flowspace</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4 w-md"
      >
        <FieldGroup>
          <form.Field
            name="email"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                    placeholder="example@gmail.com"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="password"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                    placeholder="Enter your password"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
        <Button>Login</Button>
        <div className="flex gap-2 justify-center items-center w-full">
          <span className="text-foreground/70">
            Don&apos;t have an account?
          </span>
          <Link to="/auth/register" className="text-primary">
            Register!
          </Link>
        </div>
      </form>
    </div>
  );
}
