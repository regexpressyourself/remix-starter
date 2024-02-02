import { type MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import GenericError from "~/components/generic-error";
import { makeMeta } from "~/utils/merge-meta";

export const meta: MetaFunction = makeMeta({});

export default function Index() {
  return (
    <main>
      <h1>Homepage</h1>
      <h2>Remix starter template</h2>
      <p>
        A starter template for Remix with DB integration, user authentication,
        and CSS themes.
      </p>
      <Link to="/login">
        <button className="button">Login</button>
      </Link>
    </main>
  );
}

export const ErrorBoundary = GenericError;
