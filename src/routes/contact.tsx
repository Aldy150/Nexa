import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { formations } from "../data/formations";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & inscription — NEXA" },
      { name: "description", content: "Inscrivez-vous à une formation NEXA ou contactez notre équipe pédagogique. Téléphone, WhatsApp, email." },
      { property: "og:title", content: "Contact & inscription — NEXA" },
      { property: "og:description", content: "Démarrez votre parcours NEXA dès aujourd'hui." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().min(6, "Téléphone invalide").max(30),
  formation: z.string().min(1, "Choisissez une formation"),
  message: z.string().trim().max(1000).optional(),
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Inscription reçue ! Notre équipe vous recontacte sous 24h.");
      (e.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 600);
  };

  return (
    <>
      <section className="bg-gradient-hero py-20 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Inscrivez-vous</h1>
          <p className="mt-4 text-lg text-white/85">Parlons de votre projet. Nous vous répondons sous 24h.</p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="space-y-5">
            <a href="tel:+221770000000" className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-card transition-smooth hover:shadow-elegant">
              <Phone className="h-5 w-5 text-accent" />
              <div>
                <div className="text-sm font-semibold">Téléphone</div>
                <div className="text-sm text-muted-foreground">+242 05 690 21 78</div>
              </div>
            </a>
            <a href="https://wa.me/221770000000" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-card transition-smooth hover:shadow-elegant">
              <MessageCircle className="h-5 w-5 text-accent" />
              <div>
                <div className="text-sm font-semibold">WhatsApp</div>
                <div className="text-sm text-muted-foreground">Discuter maintenant</div>
              </div>
            </a>
            <a href="mailto:contact@nexa-formation.com" className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-card transition-smooth hover:shadow-elegant">
              <Mail className="h-5 w-5 text-accent" />
              <div>
                <div className="text-sm font-semibold">Email</div>
                <div className="text-sm text-muted-foreground">contact@nexa-formation.com</div>
              </div>
            </a>
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-card">
              <MapPin className="h-5 w-5 text-accent" />
              <div>
                <div className="text-sm font-semibold">Adresse</div>
                <div className="text-sm text-muted-foreground">Brazzaville, Congo</div>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="md:col-span-2 rounded-2xl border border-border bg-card p-8 shadow-card">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium" htmlFor="name">Nom complet</label>
                <input id="name" name="name" required className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="phone">Téléphone</label>
                <input id="phone" name="phone" required className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="formation">Formation souhaitée</label>
                <select id="formation" name="formation" required defaultValue="" className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring">
                  <option value="" disabled>Choisir…</option>
                  {formations.map((f) => <option key={f.slug} value={f.slug}>{f.title}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-5">
              <label className="text-sm font-medium" htmlFor="message">Message (optionnel)</label>
              <textarea id="message" name="message" rows={4} className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button type="submit" disabled={submitting} className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-card transition-smooth hover:scale-105 disabled:opacity-60">
              {submitting ? "Envoi…" : "Envoyer ma demande"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
