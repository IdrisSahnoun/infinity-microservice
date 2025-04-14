import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environement';

export interface PlanEntrainement {
  id: number;
  titre: string;
  description: string;
  duree: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllPlans(): Observable<PlanEntrainement[]> {
    return this.http.get<PlanEntrainement[]>(`${this.apiUrl}/list`);
  }

  getPlan(id: number): Observable<PlanEntrainement> {
    return this.http.get<PlanEntrainement>(`${this.apiUrl}/${id}`);
  }

  getSimilarPlans(id: number): Observable<PlanEntrainement[]> {
    return this.http.get<PlanEntrainement[]>(`${this.apiUrl}/suggest/${id}`);
  }
}