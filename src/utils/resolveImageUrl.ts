type ImageSource = string | { url?: string | null } | null | undefined;

export function resolveImageUrl(source: ImageSource): string | undefined {
  const rawUrl = typeof source === "string" ? source : source?.url;
  const url = rawUrl?.trim();

  if (!url) return undefined;
  if (/^(?:https?:|data:|blob:)/i.test(url)) return url;
  if (url.startsWith("/placeholder-")) return url;

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  const apiOrigin = new URL(apiUrl).origin;
  return new URL(url, `${apiOrigin}/`).toString();
}
