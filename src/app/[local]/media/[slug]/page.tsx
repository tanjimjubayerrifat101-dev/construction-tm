import MediaDetailClient from "./MediaDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function MediaDetailPage({ params }: PageProps) {
  const { slug } = await params;

  return <MediaDetailClient key={slug} slug={slug} />;
}
