import type { User } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { type ActionFunction, type MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { actions } from "~/utils/actions.server";
import { authenticator } from "~/utils/auth.server";
import { PATCH_USER } from "~/utils/constants/actions";
import { makeMeta } from "~/utils/merge-meta";
import { getUser } from "~/utils/user.server";

export const meta: MetaFunction = makeMeta({});

type LoaderData = {
  user: User;
};
export const loader: LoaderFunction = async ({ request }) => {
  const isAuthenticated = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  const user = await getUser(request);
  return { user };
};

export const action: ActionFunction = async (args) => {
  const { request, params } = args;
  const form = await request.formData();
  const method = form.get("_method");
  if (method === PATCH_USER) {
    return await actions[PATCH_USER](args, form);
  }
};

export default function Index() {
  const { user } = useLoaderData<LoaderData>();
  return (
    <main>
      <h1>Protected page</h1>
      <p>Hi {user.name}!</p>
      <p>This page is protected. You need to be logged in to see this page.</p>

      <Form method="post">
        <input type="hidden" name="_method" value={PATCH_USER} />
        <label htmlFor="name">Username</label>
        <input type="text" name="name" autoFocus defaultValue={user.name} />
        <button type="submit" className="button">
          Change name
        </button>
      </Form>
    </main>
  );
}
