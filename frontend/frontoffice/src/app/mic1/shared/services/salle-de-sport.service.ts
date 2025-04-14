import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalleDeSport } from '../models/salle-de-sport.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalleDeSportService {
  private apiUrl = `${environment.apiUrl}/mic1/salles`;

  constructor(private http: HttpClient) { }

  getAllSalles(): Observable<SalleDeSport[]> {
    return this.http.get<SalleDeSport[]>(this.apiUrl);
  }

  getSalleById(id: number): Observable<SalleDeSport> {
    return this.http.get<SalleDeSport>(`${this.apiUrl}/${id}`);
  }

  getSallesByVille(ville: string): Observable<SalleDeSport[]> {
    // Note: This endpoint may need to be implemented on the backend
    return this.http.get<SalleDeSport[]>(`${this.apiUrl}/ville/${ville}`);
  }

  getSallesBySport(sportId: number): Observable<SalleDeSport[]> {
    return this.http.get<SalleDeSport[]>(`${environment.apiUrl}/mic1/sports/${sportId}/salles`);
  }
} 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalleDeSport } from '../models/salle-de-sport.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalleDeSportService {
  private apiUrl = `${environment.apiUrl}/mic1/salles`;

  constructor(private http: HttpClient) { }

  getAllSalles(): Observable<SalleDeSport[]> {
    return this.http.get<SalleDeSport[]>(this.apiUrl);
  }

  getSalleById(id: number): Observable<SalleDeSport> {
    return this.http.get<SalleDeSport>(`${this.apiUrl}/${id}`);
  }

  getSallesByVille(ville: string): Observable<SalleDeSport[]> {
    // Note: This endpoint may need to be implemented on the backend
    return this.http.get<SalleDeSport[]>(`${this.apiUrl}/ville/${ville}`);
  }

  getSallesBySport(sportId: number): Observable<SalleDeSport[]> {
    return this.http.get<SalleDeSport[]>(`${environment.apiUrl}/mic1/sports/${sportId}/salles`);
  }
} 