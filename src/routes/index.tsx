import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Briefcase, GraduationCap, Users, Award } from "lucide-react";
import heroImg from "../assets/hero-nexa.jpg";
import { formations } from "../data/formations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXA — Formations numériques & insertion professionnelle" },
      { name: "description", content: "Centre de formation NEXA : développement web, community management, graphisme, réseau, bureautique. Accompagnement vers l'emploi garanti." },
      { property: "og:title", content: "NEXA — Formations numériques & insertion professionnelle" },
      { property: "og:description", content: "Formez-vous aux métiers du numérique avec NEXA et accédez à l'emploi grâce à notre accompagnement personnalisé." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div className="animate-fade-up text-primary-foreground">
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
              Hub de transformation professionnelle
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Formations numériques <span className="block text-accent-soft">& insertion professionnelle</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              NEXA forme la nouvelle génération aux métiers du numérique et l'accompagne, étape par étape, jusqu'à l'emploi.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-elegant transition-smooth hover:scale-105">
                S'inscrire maintenant <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/formations" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-smooth hover:bg-white/20">
                Voir les formations
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <img src={heroImg} width={1536} height={1024} alt="Apprenants NEXA en formation numérique" className="rounded-2xl shadow-elegant" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-border bg-background py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { value: "+1 200", label: "Apprenants formés", icon: GraduationCap },
            { value: "87%", label: "Taux d'insertion", icon: Briefcase },
            { value: "7", label: "Filières métiers", icon: Award },
            { value: "+50", label: "Entreprises partenaires", icon: Users },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-6 text-center shadow-card">
              <s.icon className="mx-auto h-8 w-8 text-accent" />
              <div className="mt-3 font-display text-3xl font-bold text-gradient">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* À PROPOS COURT */}
      <section className="bg-gradient-subtle py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Plus qu'un centre de formation</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            NEXA est un <strong className="text-foreground">hub de transformation professionnelle</strong> qui combine
            apprentissage technique de pointe, coaching personnalisé et mise en relation directe avec les entreprises.
            Notre mission : faire de chaque apprenant un professionnel prêt à réussir.
          </p>
        </div>
      </section>

      {/* FORMATIONS */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Nos formations</h2>
            <p className="mt-4 text-muted-foreground">Des parcours intensifs pensés pour les métiers d'aujourd'hui et de demain.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {formations.map((f) => (
              <div key={f.slug} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant">
                <div className="text-4xl">{f.icon}</div>
                <h3 className="mt-4 font-display text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.short}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">{f.duration}</span>
                  <Link to="/formations" className="text-sm font-semibold text-primary transition-smooth group-hover:text-accent">
                    Découvrir →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI */}
      <section className="bg-gradient-subtle py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Pourquoi choisir NEXA ?</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { t: "Pédagogie pratique", d: "70% de pratique, projets réels et portfolio à la sortie." },
              { t: "Formateurs experts", d: "Professionnels en activité dans des entreprises tech." },
              { t: "Insertion garantie", d: "Coaching, CV, simulations d'entretien et réseau d'entreprises." },
              { t: "Communauté solide", d: "Une promotion soudée, un réseau d'alumni actif." },
              { t: "Équipement moderne", d: "Salles équipées, connexion fibre, outils professionnels." },
              { t: "Certification reconnue", d: "Diplômes valorisés sur le marché de l'emploi." },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <CheckCircle2 className="h-6 w-6 text-accent" />
                <h3 className="mt-3 font-display text-lg font-bold">{x.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Ils ont transformé leur carrière</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "Awa Diop", r: "Développeuse Front-End", t: "En 9 mois, je suis passée de zéro à mon premier CDI dans une startup. NEXA a tout changé." },
              { n: "Moussa Sarr", r: "Community Manager", t: "L'accompagnement après la formation est exceptionnel. J'ai signé avant même la fin du cursus." },
              { n: "Fatou Ndiaye", r: "Graphiste freelance", t: "Une équipe pédagogique passionnée et un réseau qui ouvre de vraies opportunités." },
            ].map((p) => (
              <figure key={p.n} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <blockquote className="text-sm italic text-foreground">« {p.t} »</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-hero font-semibold text-primary-foreground">
                    {p.n.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{p.n}</div>
                    <div className="text-xs text-muted-foreground">{p.r}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-4xl px-4 text-center text-primary-foreground sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Prêt à lancer votre carrière numérique ?</h2>
          <p className="mt-4 text-lg text-white/85">Rejoignez la prochaine promotion NEXA et faites de votre passion un métier.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-accent px-8 py-4 text-base font-semibold text-accent-foreground shadow-elegant transition-smooth hover:scale-105">
            S'inscrire à une formation <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
