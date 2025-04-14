import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalleDeSport } from '../models/salle-de-sport.model';
import { environment } from '../../../environments/environment';

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

  createSalle(salle: SalleDeSport): Observable<SalleDeSport> {
    return this.http.post<SalleDeSport>(this.apiUrl, salle);
  }

  updateSalle(id: number, salle: SalleDeSport): Observable<SalleDeSport> {
    return this.http.put<SalleDeSport>(`${this.apiUrl}/${id}`, salle);
  }

  deleteSalle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 