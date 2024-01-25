import { type LinksFunction, type MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  useRouteError,
} from "@remix-run/react";
import manifest from "~/manifest.json";
import globalStylesUrl from "~/styles/global.css";
import { HTML_HEAD } from "~/utils/constants/html";
import Nabbar from "./components/Nabbar";

export const meta: MetaFunction = () => [
  ...HTML_HEAD,
  { title: manifest.title },
  { name: "description", content: manifest.description },
];

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: globalStylesUrl,
    },
    {
      rel: "icon",
      href: manifest.faviconSrc,
      type: "image/png",
    },
  ];
};

export default function App() {
  const theme = manifest.theme || "default";

  return (
    <html lang="en" className={`${theme}-theme`}>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={`App ${theme}-theme`}>
        <Nabbar
          homeLink="/"
          buttons={[
            <Link key={"home-link"} to={`/`}>
              <button>Home</button>
            </Link>,
          ]}
          menuItems={[
            {
              href: "/",
              title: <>Home</>,
            },
            {
              href: "/protected",
              title: <>Protected page</>,
            },
            {
              href: "/logout",
              title: <>Log out</>,
            },
          ]}
        />
        <div className="Body">
          <Outlet />
        </div>
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Something went wrong</h1>
        <p>Sorry about that. Try refreshing the page to fix the issue.</p>
        <Scripts />
      </body>
    </html>
  );
}
