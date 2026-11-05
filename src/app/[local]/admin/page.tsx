import { redirect } from "next/navigation";

export default async function AdminRootPage({
  params,
}: {
  params: Promise<{ local: string }>;
}) {
  const { local } = await params;
  redirect(`/${local}/admin/dashboard`);
}
