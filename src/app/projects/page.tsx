import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Section, SectionHeader } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getDevelopers, getProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "New Projects & Developers in Mumbai",
  description:
    "New launches and under-construction projects across Mumbai's western suburbs, with developer profiles, configurations, possession dates and RERA details.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const [projects, developers] = await Promise.all([
    getProjects(),
    getDevelopers(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="New launches and under-construction projects"
        description="We're selective about what we represent. Our clients trust our recommendations because we don't recommend everything."
        breadcrumbs={[{ name: "Projects", href: "/projects" }]}
      />

      <Section>
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <RevealItem key={project.id} className="h-full">
              <ProjectCard project={project} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="muted">
        <SectionHeader
          eyebrow="Developers"
          title="Who's building in the western suburbs"
          description="Every developer we work with, and what they've actually delivered."
        />

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {developers.map((developer) => (
            <RevealItem key={developer.id} className="h-full">
              <Link
                href={`/developers/${developer.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-indigo-200 hover:shadow-xl hover:shadow-brand-indigo/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <h3 className="text-lg text-brand-indigo-900">
                  {developer.name}
                </h3>
                {developer.established && (
                  <p className="mt-1 text-xs uppercase tracking-wider text-brand-gold-600">
                    Since {developer.established}
                  </p>
                )}
                <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {developer.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-primary">
                  {developer.projectCount}{" "}
                  {developer.projectCount === 1 ? "project" : "projects"} →
                </p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
