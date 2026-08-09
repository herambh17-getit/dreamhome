import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { Prose } from "@/components/prose";
import { BlogCard } from "@/components/blog-card";
import { Section, SectionHeader } from "@/components/section";
import { EnquiryForm } from "@/components/enquiry-form";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/queries";
import { formatDate } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const all = await getBlogPosts();
  const related = all
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={post.category}
        title={post.title}
        breadcrumbs={[
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/65">
          <span className="font-medium text-white/85">{post.author}</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden />
            {post.readingMinutes} min read
          </span>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <article>
            {post.image && (
              <div className="relative mb-10 aspect-16/9 overflow-hidden rounded-2xl bg-brand-indigo-50">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            )}

            <p className="mb-8 border-l-2 border-brand-gold pl-5 text-pretty text-lg font-semibold leading-relaxed text-brand-indigo-900">
              {post.excerpt}
            </p>

            <Prose content={post.content} />

            {post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-6">
                <span className="text-sm text-muted-foreground">Tagged</span>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* This is guidance, not advice. Say so on the page rather than
                only in the footer — someone landing here from search will
                never see the footer. */}
            <aside className="mt-8 rounded-2xl border border-border bg-brand-light p-5">
              <p className="text-pretty text-xs leading-relaxed text-muted-foreground">
                <strong className="font-semibold text-brand-indigo-900">
                  General guidance only.
                </strong>{" "}
                This article explains how things generally work and is not legal,
                tax or investment advice for your situation. Rules and rates
                change. Verify anything material — starting with the MahaRERA
                portal — and speak to a qualified professional before you commit.
              </p>
            </aside>
          </article>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg text-brand-indigo-900">
                Have a question about this?
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Ask {siteConfig.founder.name.replace("Mr. ", "")} directly.
              </p>
              <EnquiryForm
                source={`blog:${post.slug}`}
                className="mt-5"
                compact
              />
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <Section tone="muted">
          <SectionHeader
            align="left"
            eyebrow="Keep reading"
            title={`More on ${post.category.toLowerCase()}`}
            className="mx-0"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} className="h-full" />
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href="/blog" variant="outline" size="lg">
              All articles
            </ButtonLink>
          </div>
        </Section>
      )}

      <ArticleJsonLd post={post} />
    </>
  );
}
