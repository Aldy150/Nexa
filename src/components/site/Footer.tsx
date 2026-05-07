import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-hero text-primary-foreground">N</span>
            <span className="text-gradient">NEXA</span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            Centre de formation numérique et hub d'insertion professionnelle.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Navigation</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Accueil</Link></li>
            <li><Link to="/formations" className="hover:text-foreground">Formations</Link></li>
            <li><Link to="/a-propos" className="hover:text-foreground">À propos</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Formations phares</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Développement Web & Mobile</li>
            <li>Community Manager</li>
            <li>Graphisme & Vidéo</li>
            <li>Réseau Informatique</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +242 05 690 21 78</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> contact@nexa-formation.com</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Brazzaville, Congo</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NEXA — Tous droits réservés.
      </div>
    </footer>
  );
}
