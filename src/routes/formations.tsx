import { createFileRoute, Link } from "@tanstack/react-router";
import { formations } from "../data/formations";

export const Route = createFileRoute("/formations")({
  head: () => ({
    meta: [
      { title: "Nos formations numériques — NEXA" },
      { name: "description", content: "Découvrez les 7 formations professionnelles NEXA : développement web, community management, graphisme, réseau, bureautique et plus." },
      { property: "og:title", content: "Nos formations numériques — NEXA" },
      { property: "og:description", content: "7 parcours professionnalisants pour transformer votre carrière dans le numérique." },
    ],
  }),
  component: FormationsPage,
});

function FormationsPage() {
  return (
    <>
      <section className="bg-gradient-hero py-20 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Nos formations</h1>
          <p className="mt-4 text-lg text-white/85">Des parcours intensifs et professionnalisants pour les métiers du numérique.</p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {formations.map((f) => (
            <article key={f.slug} className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant">
              <div className="text-4xl">{f.icon}</div>
              <h2 className="mt-4 font-display text-xl font-bold">{f.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{f.short}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">{f.duration}</span>
                <Link to="/contact" className="text-sm font-semibold text-primary transition-smooth group-hover:text-accent">
                  S'inscrire →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
