import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="brand-gradient flex min-h-[80svh] items-center justify-center px-4 py-32">
      <div className="text-center">
        <p className="text-7xl font-extrabold text-brand-gold sm:text-8xl">404</p>
        <h1 className="mt-4 text-balance text-3xl text-white sm:text-4xl">
          That page doesn&apos;t exist
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-white/70">
          The link may be old, or the listing may have been taken down. Either
          way, we can point you at what you were probably looking for.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink
            href="/properties"
            size="lg"
            className="bg-brand-gold text-brand-indigo-950 hover:bg-brand-gold-400"
          >
            Browse properties
          </ButtonLink>
          <ButtonLink
            href="/"
            size="lg"
            variant="outline"
            className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white"
          >
            Back to home
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
