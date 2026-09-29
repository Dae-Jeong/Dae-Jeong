import { notFound, redirect } from "next/navigation";
import { CASES } from "@/lib/cases";
import { CAREER_CASE_LINKS } from "@/lib/career-links";

export default async function CasePage({ params }: { params: Promise<{ case: string }> }) {
  const { case: slug } = await params;
  if (slug === "laughtale") redirect(CAREER_CASE_LINKS.laughtale);
  if (!CASES.some((item) => item.slug === slug && item.available)) notFound();
  redirect(CAREER_CASE_LINKS[slug] ?? "/career");
}
