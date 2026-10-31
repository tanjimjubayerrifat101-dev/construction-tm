import { redirect } from "next/navigation";

export default async function CareerIdRedirectPage({
  params,
}: {
  params: Promise<{ local: string; id: string }>;
}) {
  const { local, id } = await params;
  redirect(`/${local}/careers/${id}`);
}
