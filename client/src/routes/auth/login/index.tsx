import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { loginSchema } from "@/zod/auth";
import { useLoginMutation } from "@/api/mutations/auth";

export const Route = createFileRoute("/auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const loginMutation = useLoginMutation();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: loginSchema,
      onBlur: loginSchema,
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      await loginMutation.mutateAsync(value);
    },
  });
  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full h-screen">
      <div className="flex flex-col gap-2">
        <Logo />
        <h3 className="font-medium text-center text-md">
          Welcome back to Flowspace
        </h3>
      </div>
      <form
        className="flex flex-col gap-4 items-center min-w-xs"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <FieldSet>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      placeholder="Email address"
                    />
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
                      type="password"
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                  </Field>
                );
              }}
            />
          </FieldSet>
        </FieldGroup>
        <Button className="w-full" type="submit">
          Login
        </Button>
        <p className="flex gap-2 justify-center items-center">
          <span>Don&apos;t have an account?</span>
          <Link to="/auth/register" className="text-primary">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
