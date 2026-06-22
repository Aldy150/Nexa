"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Loader2, Send } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { formations } from "../data/formations";
import FadeIn from "../components/animation/FadeIn";



export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & inscription — NEXA" },
      { name: "description", content: "Inscrivez-vous à une formation NEXA ou contactez notre équipe pédagogique." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(100),
  email: z.string().trim().email("Email invalide"),
  phone: z.string().trim().min(8, "Numéro de téléphone invalide"),
  formation: z.string().min(1, "Veuillez choisir une formation"),
  message: z.string().trim().max(1000).optional(),
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      formation: formData.get("formation"),
      message: formData.get("message") || undefined,
    };

    const result = schema.safeParse(rawData);

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setSubmitting(true);

    try {

      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Demande enregistrée !", {
          description: "L'équipe NEXA vous contactera sous 24h.",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (error) {
      console.error("Erreur formulaire:", error);
      toast.error("Échec de l'envoi. Vérifiez votre connexion.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-gradient-hero py-20 text-primary-foreground relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 text-center relative z-10 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              Rejoignez NEXA
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl font-light text-white/90">
              Faites le premier pas vers votre nouvelle carrière numérique au Congo.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-background py-16 -mt-10">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-3 lg:px-8">

          {/* COLONNE INFOS */}
          <div className="space-y-6">
            <h3 className="font-display px-2 text-2xl font-bold">Nos coordonnées</h3>
            {[
              { href: "tel:+242056902178", icon: Phone, label: "Téléphone", val: "+242 05 690 21 78" },
              { href: "https://wa.me/242056902178", icon: MessageCircle, label: "WhatsApp", val: "Discuter en direct", target: "_blank" },
              { href: "mailto:contact@nexa-formation.com", icon: Mail, label: "Email", val: "contact@nexa-formation.com" },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.1}>
                <a
                  href={item.href}
                  target={item.target}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-accent/50 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{item.label}</div>
                    <div className="text-sm font-semibold">{item.val}</div>
                  </div>
                </a>
              </FadeIn>
            ))}
            <FadeIn delay={0.3}>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Localisation</div>
                  <div className="text-sm font-semibold">Brazzaville, République du Congo</div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* COLONNE FORMULAIRE */}
          <div className="md:col-span-2">
            <FadeIn delay={0.2}>
              <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-8 shadow-xl lg:p-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold" htmlFor="name">Nom complet</label>
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder="Ex: Eric Massita"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold" htmlFor="email">Email professionnel</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="eric@exemple.com"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold" htmlFor="phone">Numéro WhatsApp</label>
                    <input
                      id="phone"
                      name="phone"
                      required
                      placeholder="+242 -- --- -- --"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold" htmlFor="formation">Formation d'intérêt</label>
                    <select
                      id="formation"
                      name="formation"
                      required
                      defaultValue=""
                      className="w-full cursor-pointer appearance-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-accent"
                    >
                      <option value="" disabled>Sélectionnez un programme</option>
                      {formations.map((f) => (
                        <option key={f.slug} value={f.slug}>{f.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <label className="text-sm font-semibold" htmlFor="message">Message ou questions (optionnel)</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Dites-nous en plus sur vos objectifs..."
                    className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-accent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-accent px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-accent/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Envoyer ma demande d'inscription
                    </>
                  )}
                </button>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}