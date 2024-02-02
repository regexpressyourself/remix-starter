import { type MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import GenericError from "~/components/generic-error";
import { makeMeta } from "~/utils/merge-meta";

export const meta: MetaFunction = makeMeta({ title: "Not found" });

export default function FourOhFour() {
  return (
    <main>
      <h1>Page not found</h1>
      <p>Sorry about that.</p>
      <Link to="/">
        <button className="button">Go back home</button>
      </Link>
    </main>
  );
}

export const ErrorBoundary = GenericError;
