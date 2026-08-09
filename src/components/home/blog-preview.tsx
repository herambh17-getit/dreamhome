import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { BlogCard } from "@/components/blog-card";
import type { BlogPost } from "@/lib/types";

export function BlogPreview({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;

  return (
    <Section id="insights" tone="muted">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader
          align="left"
          eyebrow="Insights"
          title="Straight answers to the questions that matter"
          description="No market hype. Just how this actually works, written by people who do it every week."
          className="mx-0"
        />
        <Reveal>
          <ButtonLink href="/blog" variant="outline" size="lg">
            Read the blog
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </Reveal>
      </div>

      <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <RevealItem key={post.id} className="h-full">
            <BlogCard post={post} className="h-full" />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
