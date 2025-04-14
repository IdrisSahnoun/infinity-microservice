import { SalleDeSport } from './salle-de-sport.model';

export interface SalleStatistics {
  totalSalles: number;
  sallesParVille: { [key: string]: number };
  moyennePrix: number;
  capaciteTotale: number;
  sportsPlusOfferts: string[];
}

export interface SalleRecommendation {
  salles: SalleDeSport[];
  criteres: {
    ville: string;
    prixMax: number;
    sportsPreferes: string[];
  };
}

export interface SportTendance {
  nom: string;
  nombreSalles: number;
}

export interface TendancesParVille {
  [ville: string]: SportTendance[];
}