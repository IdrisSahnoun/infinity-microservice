import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sport } from '../models/sport.model';
import { environment } from '../../../../environments/environment';

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

  getSportsByDifficulte(difficulte: string): Observable<Sport[]> {
    // Note: This endpoint may need to be implemented on the backend
    return this.http.get<Sport[]>(`${this.apiUrl}/difficulte/${difficulte}`);
  }

  getSportsByPrixMax(prixMax: number): Observable<Sport[]> {
    // Note: This endpoint may need to be implemented on the backend
    return this.http.get<Sport[]>(`${this.apiUrl}/prix-max/${prixMax}`);
  }
} 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sport } from '../models/sport.model';
import { environment } from '../../../../environments/environment';

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

  getSportsByDifficulte(difficulte: string): Observable<Sport[]> {
    // Note: This endpoint may need to be implemented on the backend
    return this.http.get<Sport[]>(`${this.apiUrl}/difficulte/${difficulte}`);
  }

  getSportsByPrixMax(prixMax: number): Observable<Sport[]> {
    // Note: This endpoint may need to be implemented on the backend
    return this.http.get<Sport[]>(`${this.apiUrl}/prix-max/${prixMax}`);
  }
} 