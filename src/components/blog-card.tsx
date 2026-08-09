import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDateShort } from "@/lib/format";
import type { BlogPost } from "@/lib/types";

export function BlogCard({
  post,
  className,
}: {
  post: BlogPost;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300",
        "hover:-translate-y-1 hover:border-brand-indigo-200 hover:shadow-xl hover:shadow-brand-indigo/8",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className,
      )}
    >
      <div className="relative aspect-16/10 overflow-hidden bg-brand-indigo-50">
        {post.image ? (
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="brand-gradient size-full" aria-hidden />
        )}
        <Badge className="absolute left-3 top-3 border-0 bg-white/90 font-semibold text-brand-indigo-900">
          {post.category}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-pretty text-lg leading-snug text-brand-indigo-900">
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
          <time dateTime={post.publishedAt}>
            {formatDateShort(post.publishedAt)}
          </time>
          <span aria-hidden>·</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden />
            {post.readingMinutes} min read
          </span>
        </div>
      </div>
    </article>
  );
}
