import type { LoaderFunction } from "@remix-run/node";
import { type MetaFunction } from "@remix-run/node";
import GenericError from "~/components/generic-error";
import { authenticator } from "~/utils/auth.server";
import { makeMeta } from "~/utils/merge-meta";

export const meta: MetaFunction = makeMeta({});

export const loader: LoaderFunction = async ({ request }) => {
  return authenticator.logout(request, {
    redirectTo: "/login",
  });
};

export const ErrorBoundary = GenericError;
