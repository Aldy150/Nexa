import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// 1. Définition du schéma
const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  formation: z.string(),
  message: z.string().optional(),
});

type ContactInput = z.infer<typeof contactSchema>;

// 2. Utilisation de la syntaxe .handler directement avec validation manuelle
export const submitContactAction = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    // On force la validation ici
    const data = contactSchema.parse(ctx.data) as ContactInput;

    try {
      await prisma.inscription.create({
        data: {
          nom: data.name,
          email: data.email,
          telephone: data.phone,
          formation: data.formation,
          message: data.message || "",
        },
      });

      await resend.emails.send({
        from: 'NEXA Hub <onboarding@resend.dev>',
        to: 'aldymayoubou6@gmail.com',
        subject: `Nouveau prospect : ${data.name} (${data.formation})`,
        html: `
    <div style="font-family: sans-serif; color: #333; line-height: 1.6; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
      <h2 style="color: #000; border-bottom: 2px solid #0056b3; padding-bottom: 10px;">
        Nouveau prospect NEXA
      </h2>
      
      <p>Bonjour Aldy,</p>
      <p>Un nouvel apprenant vient de s'inscrire via le formulaire de contact du site. Voici ses informations :</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong> Nom complet :</strong> ${data.name}</p>
        <p style="margin: 5px 0;"><strong> Filière choisie :</strong> ${data.formation}</p>
        <p style="margin: 5px 0;"><strong> Numéro WhatsApp :</strong> <a href="https://wa.me/${data.phone.replace(/\s+/g, '')}" style="color: #25d366; font-weight: bold;">${data.phone}</a></p>
        <p style="margin: 5px 0;"><strong> Email :</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      </div>

      <p><strong> Message de l'apprenant :</strong></p>
      <blockquote style="font-style: italic; color: #666; border-left: 4px solid #ddd; padding-left: 15px; margin-left: 0;">
        ${data.message || "Aucun message spécifique."}
      </blockquote>

      <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
      
      <p style="font-size: 12px; color: #999; text-align: center;">
        Cet email a été envoyé automatiquement depuis la plateforme NEXA Hub.
      </p>
    </div>
  `,
      });

      return { success: true };
    } catch (error) {
      console.error("Erreur serveur:", error);
      throw new Error("Erreur de traitement");
    }
  });