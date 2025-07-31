"use server";

import { currentRole } from "@/lib/auth";
import { USER_ROLES } from "@/schemas";

export const admin = async () => {
  const role = await currentRole();

  if (role === USER_ROLES.ADMIN) {
    return { success: "Allowed Server Action!" };
  }

  return { error: "Forbidden Server Action!" }
};
