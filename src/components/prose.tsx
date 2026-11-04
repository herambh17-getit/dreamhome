import Link from "next/link";
import { Fragment, type ReactNode } from "react";

/**
 * Minimal Markdown renderer for blog content.
 *
 * Supports the subset the posts actually use: `##`/`###` headings, unordered
 * and ordered lists, `**bold**`, `[links](/path)` (same-site paths and https
 * only — see LINK below), and paragraphs.
 *
 * Deliberately does NOT use `dangerouslySetInnerHTML`. Blog bodies will
 * eventually come from the CMS, i.e. from a database row an admin can edit —
 * rendering that as raw HTML would turn a compromised or careless admin
 * account into stored XSS against every reader. Everything here goes through
 * React's escaping.
 *
 * If the content model ever needs images or tables, reach for a real
 * Markdown pipeline with sanitisation rather than growing this further.
 */
export function Prose({ content }: { content: string }) {
  return (
    <div className="space-y-5">
      {parseBlocks(content).map((block, i) => (
        <Fragment key={i}>{block}</Fragment>
      ))}
    </div>
  );
}

function parseBlocks(content: string): ReactNode[] {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];

  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(
      <p className="text-pretty leading-relaxed text-foreground/80">
        {inline(paragraph.join(" "))}
      </p>,
    );
    paragraph = [];
  };

  const flushList = () => {
    if (!list) return;
    const { ordered, items } = list;
    const className =
      "ml-5 space-y-2 text-pretty leading-relaxed text-foreground/80";

    blocks.push(
      ordered ? (
        <ol className={`${className} list-decimal`}>
          {items.map((item, i) => (
            <li key={i} className="pl-1.5">
              {inline(item)}
            </li>
          ))}
        </ol>
      ) : (
        <ul className={`${className} list-disc marker:text-brand-gold-600`}>
          {items.map((item, i) => (
            <li key={i} className="pl-1.5">
              {inline(item)}
            </li>
          ))}
        </ul>
      ),
    );
    list = null;
  };

  const flushAll = () => {
    flushParagraph();
    flushList();
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (!line.trim()) {
      flushAll();
      continue;
    }

    const heading = /^(#{2,3})\s+(.*)$/.exec(line);
    if (heading) {
      flushAll();
      const text = heading[2];
      blocks.push(
        heading[1].length === 2 ? (
          <h2 className="pt-4 text-2xl text-brand-indigo-900">
            {inline(text)}
          </h2>
        ) : (
          <h3 className="pt-2 text-xl text-brand-indigo-900">{inline(text)}</h3>
        ),
      );
      continue;
    }

    const unordered = /^[-*]\s+(.*)$/.exec(line);
    if (unordered) {
      flushParagraph();
      // An ordered list already in progress is a different block — close it.
      if (list?.ordered) flushList();
      if (!list) list = { ordered: false, items: [] };
      list.items.push(unordered[1]);
      continue;
    }

    const ordered = /^\d+\.\s+(.*)$/.exec(line);
    if (ordered) {
      flushParagraph();
      if (list && !list.ordered) flushList();
      if (!list) list = { ordered: true, items: [] };
      list.items.push(ordered[1]);
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }

  flushAll();
  return blocks;
}

/**
 * Matches `[text](href)` where href is either a same-site path ("/about" —
 * but never "//host", which browsers treat as another site) or an https URL.
 * Anything else — `javascript:`, `data:`, plain http — is left as literal
 * text, so a careless CMS edit can't turn into a script link.
 */
const LINK = /\[([^\]]+)\]\((\/(?!\/)[^)\s]*|https:\/\/[^)\s]+)\)/;

/**
 * Renders `**bold**` and `[links](/path)` spans. Text is escaped by React,
 * never injected.
 */
function inline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g);

  return parts.filter(Boolean).map((part, i) => {
    const bold = /^\*\*([^*]+)\*\*$/.exec(part);
    if (bold) {
      return (
        <strong key={i} className="font-semibold text-brand-indigo-900">
          {bold[1]}
        </strong>
      );
    }

    const link = LINK.exec(part);
    if (link && link[0] === part) {
      const [, label, href] = link;
      const className =
        "font-medium text-primary underline underline-offset-2 hover:text-brand-indigo-900";
      return href.startsWith("/") ? (
        <Link key={i} href={href} className={className}>
          {label}
        </Link>
      ) : (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {label}
        </a>
      );
    }

    return <Fragment key={i}>{part}</Fragment>;
  });
}
