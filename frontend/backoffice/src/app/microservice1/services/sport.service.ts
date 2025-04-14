import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sport } from '../models/sport.model';
import { SalleDeSport } from '../models/salle-de-sport.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SportService {
  private apiUrl = `${environment.apiUrl}/mic1/sports`;

  constructor(private http: HttpClient) { }

  getAllSports(): Observable<Sport[]> {
    return this.http.get<Sport[]>(this.apiUrl);
  }

  getSportById(id: number): Observable<Sport> {
    return this.http.get<Sport>(`${this.apiUrl}/${id}`);
  }

  createSport(sport: Sport): Observable<Sport> {
    return this.http.post<Sport>(this.apiUrl, sport);
  }

  updateSport(id: number, sport: Sport): Observable<Sport> {
    return this.http.put<Sport>(`${this.apiUrl}/${id}`, sport);
  }

  deleteSport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Relationship management
  assignSportToSalle(sportId: number, salleId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${sportId}/salles/${salleId}`, {});
  }

  removeSportFromSalle(sportId: number, salleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${sportId}/salles/${salleId}`);
  }

  getSallesBySportId(sportId: number): Observable<SalleDeSport[]> {
    return this.http.get<SalleDeSport[]>(`${this.apiUrl}/${sportId}/salles`);
  }
} 