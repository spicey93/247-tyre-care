import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/**
 * Uses server `auth()` only (same as the dashboard layout). Avoids Edge middleware
 * `req.auth` disagreeing with Node `auth()` after login — that caused redirect loops on Vercel.
 */
export default async function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user) {
    redirect("/admin");
  }
  return <>{children}</>;
}
