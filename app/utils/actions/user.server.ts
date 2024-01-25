import type { ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { db } from "~/utils/db.server";
import { requireUserId } from "~/utils/user.server";

import { PATCH_USER } from "~/utils/constants/actions";

export const actions = {
  [PATCH_USER]: async ({ request }: ActionFunctionArgs, form: FormData) => {
    const userId = await requireUserId(request);
    const name = form.get("name");
    if (!userId) {
      throw new Response("Can't delete what does not exist", { status: 404 });
    }

    const nextUser = await db.user.update({
      where: { id: userId },
      data: {
        name: name as string,
      },
    });

    return { form: PATCH_USER, status: 200, user: nextUser };
  },
};
