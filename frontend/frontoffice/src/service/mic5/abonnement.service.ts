import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Déclaration de l'entité Abonnement
export interface Abonnement {
    id?: number; // Optionnel car l'ID peut être généré par le backend
    date_debut: string;
    date_fin: string;
    montant: number;
  }

@Injectable({
  providedIn: 'root',
})
export class AbonnementService {
  private baseUrl = 'http://localhost:8088/abonnements'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  
  // Récupérer tous les abonnements
  getAllAbonnements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`); // GET /abonnements
  }

  // Récupérer un abonnement par ID
  getAbonnementById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`); // GET /abonnements/{id}
  }

  // Créer un nouvel abonnement
createAbonnement(abonnement: Abonnement): Observable<Abonnement> {
  return this.http.post<Abonnement>(`${this.baseUrl}/create`, abonnement); // Ajoutez "/create" ici
}
  // Mettre à jour un abonnement existant
  updateAbonnement(id: number, abonnementDetails: Abonnement): Observable<Abonnement> {
    return this.http.put<Abonnement>(`${this.baseUrl}/${id}`, abonnementDetails); // PUT /abonnements/{id}
  }

  // Supprimer un abonnement
  deleteAbonnement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`); // DELETE /abonnements/{id}
  }
  
  // Récupérer les statistiques des abonnements
  getAbonnementStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/stats`); // GET /abonnements/stats
  }
}