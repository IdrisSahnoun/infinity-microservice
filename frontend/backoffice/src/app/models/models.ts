export interface PlanEntrainement {
  id: number;
  titre: string;
  description: string;
  duree: number;
  actif?: boolean;
  lastModified?: Date;
}
