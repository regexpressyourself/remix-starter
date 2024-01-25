import { authenticator } from "~/utils/auth.server";
import { db } from "./db.server";
import { sessionStorage } from "./session.server";

type LoginForm = {
  username: string;
  password: string;
};

export async function getUserSession(request: Request): Promise<any> {
  const sessionKey = await authenticator.sessionKey;
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  return session;
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const sessionKey = await authenticator.sessionKey;
  const authSession = session.get(sessionKey);
  if (!authSession) {
    return null;
  }
  const { id: userId } = authSession;
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  const session = await sessionStorage?.getSession(
    request.headers.get("Cookie")
  );
  const userId = await getUserId(request);
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);

    return await authenticator.logout(request, {
      redirectTo: `/login?${searchParams}`,
    });
  }
  return userId;
}

export async function getUser(request: Request) {
  //const user = await authenticator.isAuthenticated(request)
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });
    return user;
  } catch {
    return null;
  }
}
