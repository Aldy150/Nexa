// src/actions/contact.ts
"use server"
import { z } from "zod";
import { prisma } from "./prisma";

// Schéma de validation (identique à celui du client)
const contactSchema = z.object({
    name: z.string().min(2, "Nom trop court").max(100),
    email: z.string().email("Email invalide"),
    phone: z.string().min(8, "Numéro de téléphone invalide"),
    formation: z.string().min(1, "Veuillez choisir une formation"),
    message: z.string().optional(),
});

type ContactInput = z.infer<typeof contactSchema>;

// Fonction serveur simple (pas de createServerFn pour éviter le bug)
export async function submitContactAction(data: unknown): Promise<{ success: boolean }> {
    // Validation des données
    const validated = contactSchema.parse(data) as ContactInput;

    try {
        // Sauvegarde dans Prisma
        await prisma.inscription.create({
            data: {
                nom: validated.name,
                email: validated.email,
                telephone: validated.phone,
                formation: validated.formation,
                message: validated.message || "",
            },
        });

        // Import dynamique de Resend (évite l'erreur AsyncLocalStorage)
        const { Resend } = await import('resend');
        const resend = new Resend(Bun.env.RESEND_API_KEY);

        await resend.emails.send({
            from: 'NEXA Hub <onboarding@resend.dev>',
            to: 'aldymayoubou6@gmail.com',
            subject: `Nouveau prospect : ${validated.name}`,
            html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1a1a1a; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fcfcfc;">
      
      <!-- Header avec Gradient (rappel NEXA) -->
      <div style="background: linear-gradient(135deg, #0056b3 0%, #00a1ff 100%); padding: 30px; border-radius: 15px 15px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 1px;">NEXA HUB</h1>
        <p style="color: rgba(255,255,255,0.9); margin-top: 5px; font-size: 14px;">Nouvelle inscription reçue</p>
      </div>

      <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 15px 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
        
        <p style="font-size: 16px;">Une nouvelle demande d'inscription vient d'être soumise via le portail <strong>Nexa</strong>.</p>
        
        <div style="margin: 25px 0; border-left: 4px solid #0056b3; padding-left: 20px;">
          <h3 style="margin-bottom: 15px; color: #0056b3; text-transform: uppercase; font-size: 13px; letter-spacing: 1px;">Détails du profil</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px; width: 40%;">Nom complet</td>
              <td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${validated.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Formation</td>
              <td style="padding: 8px 0;">
                <span style="background-color: #e3f2fd; color: #0056b3; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; border: 1px solid #bbdefb;">
                  ${validated.formation.toUpperCase()}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">WhatsApp</td>
              <td style="padding: 8px 0; font-weight: 600; font-size: 14px; color: #25D366;">${validated.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Email</td>
              <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${validated.email}" style="color: #0056b3; text-decoration: none;">${validated.email}</a></td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin-top: 25px;">
          <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #333;">Message du candidat :</h3>
          <p style="margin: 0; font-style: italic; color: #555; font-size: 14px; line-height: 1.5;">
            "${validated.message || "Aucun message particulier n'a été laissé."}"
          </p>
        </div>

        <div style="margin-top: 30px; text-align: center;">
          <a href="https://wa.me/${validated.phone.replace(/\s+/g, '')}" 
             style="background-color: #25D366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px;">
             Contacter sur WhatsApp
          </a>
        </div>

      </div>

      <div style="text-align: center; margin-top: 20px; color: #999; font-size: 11px;">
        <p>Ce message a été généré automatiquement par le système NEXA Hub.<br/>
        © 2026 NEXA Formation - Tous droits réservés.</p>
      </div>
    </div>
  `,
        });;

        return { success: true };
    } catch (error) {
        console.error("Erreur serveur détaillée:", error);
        throw new Error("Erreur lors du traitement de l'inscription");
    }
}