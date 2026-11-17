import { redirect } from "next/navigation";

export default function SignRedirectPage({
  searchParams,
}: {
  searchParams?: { mode?: string; next?: string };
}) {
  const isRegister = searchParams?.mode === "register";
  const next = searchParams?.next;
  const target = isRegister ? "/sign-up" : "/sign-in";
  const url = next ? `${target}?next=${encodeURIComponent(next)}` : target;

  redirect(url);
}
