import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { BlogCard } from "@/components/blog-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getBlogPosts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Property Insights & Guides for Mumbai Buyers",
  description:
    "Practical guides on buying, selling, renting and investing in Mumbai property — RERA, due diligence, society redevelopment and NRI purchases. No hype.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="How this actually works"
        description="Guides written by people who do this every week. No market hype, no urgency, no 'best deals guaranteed'."
        breadcrumbs={[{ name: "Blog", href: "/blog" }]}
      />

      <Section>
        {posts.length > 0 ? (
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <RevealItem key={post.id} className="h-full">
                <BlogCard post={post} className="h-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <p className="text-center text-muted-foreground">
            No posts published yet.
          </p>
        )}
      </Section>
    </>
  );
}
