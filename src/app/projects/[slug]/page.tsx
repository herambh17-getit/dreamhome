import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ShieldQuestion } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PropertyGallery } from "@/components/property/property-gallery";
import { EnquiryForm } from "@/components/enquiry-form";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { getProjectBySlug, getProjects } from "@/lib/queries";
import { formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/site-config";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.name} — ${project.location}`,
    description: project.description.slice(0, 155),
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const enquiry = `Hi, I'd like details on ${project.name} in ${project.location}.`;

  return (
    <>
      <PageHeader
        eyebrow={project.status}
        title={project.name}
        description={`${project.location} · by ${project.developer}`}
        breadcrumbs={[
          { name: "Projects", href: "/projects" },
          { name: project.name, href: `/projects/${project.slug}` },
        ]}
      >
        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50">
              Starting from
            </p>
            <p className="mt-1 text-3xl font-extrabold text-brand-gold">
              {formatPrice(project.priceFrom)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50">
              Configurations
            </p>
            <p className="mt-1 font-semibold text-white">
              {project.configurations.join(" · ")}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50">
              Possession
            </p>
            <p className="mt-1 font-semibold text-white">{project.possession}</p>
          </div>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <div>
            <PropertyGallery images={project.gallery} title={project.name} />

            <section className="mt-10">
              <h2 className="text-2xl text-brand-indigo-900">
                About this project
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </section>

            {project.highlights.length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl text-brand-indigo-900">Highlights</h2>
                <ul className="mt-4 space-y-2.5">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2.5 text-sm text-foreground/80"
                    >
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-brand-gold-600"
                        aria-hidden
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.amenities.length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl text-brand-indigo-900">Amenities</h2>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {project.amenities.map((a) => (
                    <li
                      key={a}
                      className="flex items-center gap-2.5 text-sm text-foreground/80"
                    >
                      <CheckCircle2
                        className="size-4 shrink-0 text-brand-gold-600"
                        aria-hidden
                      />
                      {a}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-10">
              <h2 className="text-2xl text-brand-indigo-900">Details</h2>
              <dl className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                <Row label="Developer" value={project.developer} />
                <Row label="Location" value={project.location} />
                <Row label="Status" value={project.status} />
                <Row label="Possession" value={project.possession} />
                <Row
                  label="Configurations"
                  value={project.configurations.join(", ")}
                />
                <Row label="RERA" value={project.rera || "Not provided"} />
              </dl>
            </section>

            <aside className="mt-10 flex gap-4 rounded-2xl border border-brand-gold/30 bg-brand-gold/5 p-5">
              <ShieldQuestion
                className="size-5 shrink-0 text-brand-gold-600"
                aria-hidden
              />
              <div>
                <h2 className="text-sm font-bold text-brand-indigo-900">
                  Verify before you commit
                </h2>
                <p className="mt-1.5 text-pretty text-xs leading-relaxed text-muted-foreground">
                  Look this project up on the official MahaRERA portal yourself
                  and read the approved plans and committed possession dates
                  published there. Details here are provided in good faith for
                  general guidance and are subject to change — they are not an
                  offer. Ask us for the registration number and anything else you
                  need for your own checks.
                </p>
              </div>
            </aside>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xl text-brand-indigo-900">
                Request project details
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Floor plans, pricing, payment schedule and our honest read on
                the developer.
              </p>

              <ButtonLink
                href={whatsappLink(enquiry)}
                external
                size="lg"
                className="mt-5 w-full bg-[#25D366] text-white hover:bg-[#1da851]"
              >
                <WhatsAppIcon className="size-4" aria-hidden />
                Ask on WhatsApp
              </ButtonLink>

              <div className="my-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  or
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <EnquiryForm
                source={`project:${slug}`}
                defaultMessage={enquiry}
                compact
              />

              <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
                More from{" "}
                <Link
                  href={`/developers/${project.developerSlug}`}
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {project.developer}
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card px-5 py-4">
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-brand-indigo-900">{value}</dd>
    </div>
  );
}
