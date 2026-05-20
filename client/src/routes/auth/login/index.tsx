import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-screen">
      <img src="/flowspace-logo.png" alt="logo image" width="120" />
      <h2 className="text-lg font-medium">Welcome back to Flowspace</h2>
      <form className="flex flex-col gap-4 w-md">
        <FieldSet>
          <FieldGroup>
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
