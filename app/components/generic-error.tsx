import { useRouteError } from "@remix-run/react";
export default function GenericError() {
  const error = useRouteError();
  console.error(error);
  return (
    <main>
      <h1>Something went wrong</h1>
      <p>Sorry about that. Try refreshing the page to fix the issue.</p>
    </main>
  );
}
