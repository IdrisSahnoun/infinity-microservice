import { SalleDeSport } from './salle-de-sport.model';

export interface Sport {
  codeSport?: number;
  nom: string;
  description: string;
  niveauDifficulte: string;
  dureeMoyenne: number;
  prixAbonnementMensuel: number;
  equipementNecessaire: string;
  imageUrl: string;
  salles?: SalleDeSport[];
} 

export interface Sport {
  codeSport?: number;
  nom: string;
  description: string;
  niveauDifficulte: string;
  dureeMoyenne: number;
  prixAbonnementMensuel: number;
  equipementNecessaire: string;
  imageUrl: string;
  salles?: SalleDeSport[];
} 