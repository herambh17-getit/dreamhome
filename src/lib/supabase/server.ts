import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase credentials are optional by design.
 *
 * The whole site renders from seed data when they are absent, so the project
 * can be cloned, run and reviewed without provisioning a database. Every
 * query in `lib/queries.ts` checks this before reaching for a client.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/**
 * Server-side Supabase client, scoped to the current request's cookies.
 *
 * `cookies()` is async from Next 16 onward — synchronous access was removed,
 * so this function must be awaited.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component, where cookies are read-only.
            // Safe to ignore: `proxy.ts` refreshes the session on every
            // request, so the tokens are already current.
          }
        },
      },
    },
  );
}
