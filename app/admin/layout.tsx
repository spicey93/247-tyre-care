import { AdminSessionProvider } from "./providers";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminSessionProvider>{children}</AdminSessionProvider>;
}
