import type { LoaderFunction } from "@remix-run/node";
import { type MetaFunction } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { makeMeta } from "~/utils/merge-meta";

export const meta: MetaFunction = makeMeta({});

export const loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate("auth0", request, {
    successRedirect: "/protected",
    failureRedirect: "/login",
  });
};
