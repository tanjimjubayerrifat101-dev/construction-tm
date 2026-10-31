import { redirect } from "next/navigation";

export default async function CareerRedirectPage({
  params,
}: {
  params: Promise<{ local: string }>;
}) {
  const { local } = await params;
  redirect(`/${local}/careers`);
}