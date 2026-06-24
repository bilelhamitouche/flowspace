import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { registerSchema } from "@/zod/auth";
import { useRegisterMutation } from "@/api/mutations/auth";

export const Route = createFileRoute("/auth/register/")({
  component: RouteComponent,
});

function RouteComponent() {
  const registerMutation = useRegisterMutation();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onChange: registerSchema,
      onBlur: registerSchema,
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      await registerMutation.mutateAsync(value);
    },
  });
  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full h-screen">
      <div className="flex flex-col gap-2">
        <Logo />
        <h3 className="font-medium text-center text-md">
          Create your Flowspace account
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
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      placeholder="John Doe"
                    />
                  </Field>
                );
              }}
            />
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
                      placeholder="johndoe@gmail.com"
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
          <span>Already have an account?</span>
          <Link to="/auth/login" className="text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
