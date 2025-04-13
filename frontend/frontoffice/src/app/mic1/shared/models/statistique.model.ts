import { SalleDeSport } from './salle-de-sport.model';

export interface SalleStatistics {
  totalSalles: number;
  sallesParVille: { [key: string]: number };
  moyennePrix: number;
  capaciteTotale: number;
  sportsPlusOfferts: string[];
}

export interface SalleRecommendation {
  ville: string;
  prixMax: number;
  sportsPreferes: string[];
  sallesRecommandees: SalleDeSport[];
}

export interface SportTendance {
  sport: string;
  nombreSalles: number;
  popularite: number;
}

export interface TendancesParVille {
  [ville: string]: SportTendance[];
} 