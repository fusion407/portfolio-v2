import { getPortfolioPage, portfolioPages } from "@/content/pages";
import { socialImage } from "@/lib/social-image";
export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() {
  return portfolioPages.map((page) => ({ slug: page.slug }));
}
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const page = getPortfolioPage(slug);
  if (!page) return new Response("Image not found", { status: 404 });
  return socialImage(page);
}
