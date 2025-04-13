import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { SalleStatistics, SalleRecommendation, TendancesParVille } from '../models/statistique.model';
import { SalleDeSport } from '../models/salle-de-sport.model';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  private apiUrl = `${environment.apiUrl}/api/statistiques`;

  constructor(private http: HttpClient) { }

  // Get general statistics about sports facilities
  getStatistiquesSalles(): Observable<SalleStatistics> {
    console.log(`Calling API: ${this.apiUrl}/salles`);
    return this.http.get<SalleStatistics>(`${this.apiUrl}/salles`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get recommendations based on city, price and preferred sports
  getRecommandationsSalles(
    ville: string, 
    prixMax: number, 
    sportsPreferes: string[]
  ): Observable<SalleDeSport[]> {
    return this.http.get<SalleDeSport[]>(`${this.apiUrl}/recommandations`, {
      params: {
        ville,
        prixMax: prixMax.toString(),
        sportsPreferes: sportsPreferes.join(',')
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get sports trends by city
  getTendancesParVille(): Observable<TendancesParVille> {
    console.log(`Calling API: ${this.apiUrl}/tendances`);
    return this.http.get<TendancesParVille>(`${this.apiUrl}/tendances`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    console.error('API Error occurred:', error);
    
    if (error.status === 0) {
      // A client-side or network error occurred
      console.error('An error occurred:', error.error);
      return throwError('Network error occurred. Please check your connection.');
    }
    
    if (error.status === 404) {
      return throwError('Resource not found. The API endpoint might have changed.');
    }
    
    // Return a user-friendly error message
    return throwError(error.error?.message || 'An unexpected error occurred. Please try again later.');
  }
} 