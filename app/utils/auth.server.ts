import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "remix-auth-auth0";
import { db as prisma } from "./db.server";
import { sessionStorage } from "./session.server";

export const authenticator = new Authenticator(sessionStorage);

let auth0Strategy = new Auth0Strategy(
  {
    callbackURL: process.env.AUTH_CALLBACK_URL!,
    clientID: process.env.AUTH_CLIENT_ID!,
    clientSecret: process.env.AUTH_CLIENT_SECRET!,
    domain: process.env.AUTH_DOMAIN!,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    const email = profile.emails?.[0]?.value;
    const user = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    return prisma.user.upsert({
      where: {
        email: email as string,
      },
      create: {
        email: email as string,
        name: profile.displayName as string,
      },
      update: {},
    });
  }
);

authenticator.use(auth0Strategy);
