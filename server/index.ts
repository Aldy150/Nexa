// server/index.ts
import { submitContactAction } from "./api";

const server = Bun.serve({
  port: process.env.PORT || 3000,
  hostname: "0.0.0.0", // Ajoute cette ligne pour Railway
  async fetch(req) {
    const url = new URL(req.url);
    
    // On nettoie le chemin : on enlève le slash de fin s'il existe
    const path = url.pathname.replace(/\/$/, "");

    // Log pour voir exactement ce qui arrive dans ton terminal Bun
    console.log(`[${req.method}] ${path}`);

    // 1. Gestion CORS
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // 2. Ta Route API
    if (req.method === "POST" && path === "/api/contact") {
      try {
        const body = await req.json();
        
        // Appel de ta fonction dans api.ts
        const result = await submitContactAction(body);
        
        return Response.json(result, { headers: corsHeaders });
      } catch (err: any) {
        console.error(" Erreur API détaillée:", err);
        return Response.json(
          { success: false, error: err.message || "Server Error" }, 
          { status: 500, headers: corsHeaders }
        );
      }
    }

    // 3. Fallback (Si aucune route ne correspond)
    return new Response("Nexa API: Route non trouvée", { 
      status: 404, 
      headers: corsHeaders 
    });
  },
});

console.log(` Serveur NEXA opérationnel sur http://localhost:${server.port}`);