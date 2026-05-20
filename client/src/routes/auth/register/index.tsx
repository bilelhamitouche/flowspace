import { Button } from "@/components/ui/button";
import { FieldSet, FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-screen">
      <img src="/flowspace-logo.png" alt="logo image" width="120" />
      <h2 className="text-lg font-medium">Create your Flowspace account</h2>
      <form className="flex flex-col gap-4 w-md">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" type="name" placeholder="example@gmail.com" />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="example@gmail.com" />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <Button>Login</Button>
        <div className="flex gap-2 justify-center items-center w-full">
          <span className="text-foreground/70">Already have an account?</span>
          <Link to="/auth/login" className="text-primary">
            Login!
          </Link>
        </div>
      </form>
    </div>
  );
}
