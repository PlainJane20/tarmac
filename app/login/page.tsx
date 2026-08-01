import { Github, LockKeyhole } from "lucide-react";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { BrandMark } from "@/components/brand-mark";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();
  if (session?.user) redirect("/");

  const { error } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-[#f6f8fb] px-6 py-12">
      <section className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
        <div className="border-b border-slate-100 bg-slate-950 px-8 py-8 text-white">
          <div className="flex items-center gap-3">
            <BrandMark />
            <div>
              <p className="text-lg font-bold tracking-tight">TARMAC</p>
              <p className="text-xs text-slate-400">Enterprise Delivery Control Plane</p>
            </div>
          </div>
          <h1 className="mt-8 text-3xl font-bold tracking-tight">Authorized access only</h1>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Sign in with the approved GitHub account to enter the TARMAC command center.
          </p>
        </div>

        <div className="px-8 py-8">
          {error && (
            <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              This GitHub account is not authorized to access TARMAC.
            </div>
          )}

          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <Github className="size-5" />
              Continue with GitHub
            </button>
          </form>

          <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            <LockKeyhole className="mt-0.5 size-4 shrink-0 text-indigo-600" />
            <p>
              Repository access and application access are separate. This sign-in protects the live
              application while the source repository remains private.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
