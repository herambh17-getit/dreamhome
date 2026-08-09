import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Section, SectionHeader } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { EnquiryForm } from "@/components/enquiry-form";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getDeveloperBySlug, getDevelopers, getProjects } from "@/lib/queries";

export async function generateStaticParams() {
  const developers = await getDevelopers();
  return developers.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(
  props: PageProps<"/developers/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const developer = await getDeveloperBySlug(slug);
  if (!developer) return { title: "Developer not found" };

  return {
    title: `${developer.name} — Projects in Mumbai`,
    description: developer.description.slice(0, 155),
    alternates: { canonical: `/developers/${developer.slug}` },
  };
}

export default async function DeveloperPage(
  props: PageProps<"/developers/[slug]">,
) {
  const { slug } = await props.params;
  const developer = await getDeveloperBySlug(slug);
  if (!developer) notFound();

  const projects = (await getProjects()).filter(
    (p) => p.developerSlug === slug,
  );

  return (
    <>
      <PageHeader
        eyebrow="Developer"
        title={developer.name}
        description={
          developer.established
            ? `Building in Mumbai since ${developer.established}`
            : undefined
        }
        breadcrumbs={[
          { name: "Projects", href: "/projects" },
          { name: developer.name, href: `/developers/${developer.slug}` },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-2xl text-brand-indigo-900">
              About {developer.name}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              {developer.description}
            </p>

            {/* The single most useful thing a buyer can do about a developer
                is check the regulator's record, so say it plainly. */}
            <p className="mt-6 rounded-2xl border border-border bg-brand-light p-5 text-pretty text-xs leading-relaxed text-muted-foreground">
              <strong className="font-semibold text-brand-indigo-900">
                Do your own check.
              </strong>{" "}
              Every registered project a developer runs is listed on the
              MahaRERA portal, including committed and revised possession dates
              and any complaints filed. It is public, free, and the best
              single indicator of how a developer actually behaves. We&apos;ll
              give you the registration numbers — please look them up.
            </p>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xl text-brand-indigo-900">
                Interested in a {developer.name} project?
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                We&apos;ll send current inventory and our honest read on the
                developer&apos;s delivery record.
              </p>
              <EnquiryForm
                source={`developer:${slug}`}
                className="mt-5"
                compact
              />
            </div>
          </aside>
        </div>
      </div>

      {projects.length > 0 && (
        <Section tone="muted">
          <SectionHeader
            align="left"
            eyebrow="Portfolio"
            title={`Projects by ${developer.name}`}
            className="mx-0"
          />
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <RevealItem key={project.id} className="h-full">
                <ProjectCard project={project} className="h-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}
    </>
  );
}
