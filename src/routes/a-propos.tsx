import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Heart, Sparkles } from "lucide-react";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — NEXA, hub de transformation professionnelle" },
      { name: "description", content: "Découvrez la mission, la vision et les valeurs de NEXA, centre de formation numérique et d'insertion professionnelle." },
      { property: "og:title", content: "À propos — NEXA" },
      { property: "og:description", content: "Mission, vision et valeurs du hub NEXA." },
    ],
  }),
  component: AboutPage,
});

const blocks = [
  { icon: Target, t: "Notre mission", d: "Donner à chaque apprenant les compétences numériques et les opportunités concrètes pour réussir sa vie professionnelle." },
  { icon: Eye, t: "Notre vision", d: "Devenir le hub de référence en Afrique francophone pour la formation numérique et l'insertion professionnelle." },
  { icon: Heart, t: "Nos valeurs", d: "Excellence, bienveillance, exigence et impact concret sur la vie de nos apprenants." },
  { icon: Sparkles, t: "Notre différence", d: "Un accompagnement bout-en-bout : formation, coaching, certification et mise en relation entreprise." },
];

function AboutPage() {
  return (
    <>
      <section className="bg-gradient-hero py-20 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Plus qu'un centre, un tremplin.</h1>
          <p className="mt-4 text-lg text-white/85">
            NEXA est un hub de transformation professionnelle qui forme et accompagne la nouvelle génération du numérique.
          </p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {blocks.map((b) => (
            <div key={b.t} className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-accent text-accent-foreground">
                <b.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold">{b.t}</h2>
              <p className="mt-3 text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-subtle py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold">Notre histoire</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Né d'un constat simple — trop de jeunes talents restent éloignés de l'emploi malgré leur potentiel —
            NEXA a été fondé pour combler le fossé entre la formation et le marché du travail. Depuis, nous
            avons accompagné plus de 1 200 apprenants vers une carrière qui leur ressemble.
          </p>
        </div>
      </section>
    </>
  );
}
