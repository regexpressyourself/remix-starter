import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect, type MetaFunction } from "@remix-run/node";
import GenericError from "~/components/generic-error";
import { authenticator } from "~/utils/auth.server";
import { makeMeta } from "~/utils/merge-meta";

export const meta: MetaFunction = makeMeta({});

export const loader: LoaderFunction = () => redirect("/login");

export const action: ActionFunction = ({ request }) => {
  return authenticator.authenticate("auth0", request);
};

export const ErrorBoundary = GenericError;
