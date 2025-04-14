import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanEntrainement } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8088/plans';

  constructor(private http: HttpClient) {}

  getAllPlans(): Observable<PlanEntrainement[]> {
    return this.http.get<PlanEntrainement[]>(`${this.baseUrl}/list`);
  }

  getPlanById(id: number): Observable<PlanEntrainement> {
    return this.http.get<PlanEntrainement>(`${this.baseUrl}/${id}`);
  }

  addPlan(plan: PlanEntrainement): Observable<PlanEntrainement> {
    return this.http.post<PlanEntrainement>(`${this.baseUrl}/add`, plan);
  }

  updatePlan(id: number, plan: PlanEntrainement): Observable<PlanEntrainement> {
    return this.http.put<PlanEntrainement>(`${this.baseUrl}/update/${id}`, plan);
  }

  deletePlan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  toggleActif(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/toggle/${id}`, {});
  }

  searchPlans(keyword: string): Observable<PlanEntrainement[]> {
    return this.http.get<PlanEntrainement[]>(`${this.baseUrl}/search?keyword=${keyword}`);
  }

  filterByDuree(min?: number, max?: number): Observable<PlanEntrainement[]> {
    return this.http.get<PlanEntrainement[]>(`${this.baseUrl}/filter?min=${min ?? ''}&max=${max ?? ''}`);
  }

  sortPlans(sortBy: string): Observable<PlanEntrainement[]> {
    return this.http.get<PlanEntrainement[]>(`${this.baseUrl}/sorted?sortBy=${sortBy}`);
  }

  getStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/stats`);
  }
}
