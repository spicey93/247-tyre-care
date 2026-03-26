import { signOutAction } from "@/app/actions/auth";
import { auth } from "@/auth";
import { AdminNavLinks } from "@/components/admin-nav-links";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  const unreadLeadCount = await prisma.contactSubmission.count({
    where: { readAt: null },
  });

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
          <AdminNavLinks initialUnreadCount={unreadLeadCount} />
          <div className="flex items-center gap-3 text-sm">
            <span className="text-stone-500">{session.user.email}</span>
            <form action={signOutAction}>
              <button
                type="submit"
                className="rounded-lg border border-stone-300 px-3 py-1.5 font-medium text-stone-700 hover:bg-stone-50"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
