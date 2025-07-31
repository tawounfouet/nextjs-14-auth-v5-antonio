import { currentRole } from "@/lib/auth";
import { USER_ROLES } from "@/schemas";
import { NextResponse } from "next/server";

export async function GET() {
  const role = await currentRole();

  if (role === USER_ROLES.ADMIN) {
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(null, { status: 403 });
}
