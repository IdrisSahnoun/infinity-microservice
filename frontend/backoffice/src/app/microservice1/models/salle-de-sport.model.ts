import { Sport } from './sport.model';

export interface SalleDeSport {
  id?: number;
  nom: string;
  adresse: string;
  ville: string;
  codePostal: string;
  telephone: string;
  email: string;
  siteWeb: string;
  capacite: number;
  superficie: number;
  horairesOuverture: string;
  description: string;
  imageUrl: string;
  prixMoyenAbonnement: number;
  parkingDisponible: boolean;
  vestiairesDisponibles: boolean;
  douchesDisponibles: boolean;
  sports?: Sport[];
} 