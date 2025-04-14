export interface PlanEntrainement {
    id: number;
    titre: string;
    description: string;
    duree: number;
  }
  
  export interface Progression {
    id: number;
    plan: PlanEntrainement;
    userId: number;
    dateDebut: string; // Format ISO (YYYY-MM-DD)
    dateFinPrevue: string;
    dateDerniereMiseAJour: string;
    seancesTerminees: number;
    totalSeances: number;
  }
