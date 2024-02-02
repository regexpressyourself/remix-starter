import { type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import GenericError from "~/components/generic-error";
import { authenticator } from "~/utils/auth.server";
import { makeMeta } from "~/utils/merge-meta";

export const meta: MetaFunction = makeMeta({ title: "Login | Remix template" });

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/protected",
  });
};

export default function Login() {
  return (
    <main>
      <h1>Login</h1>
      <p>
        Login functionality is handled by{" "}
        <a href="https://auth0.com/" target="_blank">
          Auth0.
        </a>
      </p>
      <p>User data is stored in the local DB.</p>
      <Form action="/auth0" method="post">
        <button className="button">Login with Auth0</button>
      </Form>
    </main>
  );
}

export const ErrorBoundary = GenericError;
