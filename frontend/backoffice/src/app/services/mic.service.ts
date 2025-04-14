import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mic } from '../models/mic.model';

@Injectable({
  providedIn: 'root',
})
export class MicService {
  private apiUrl = 'http://localhost:8088/competition/api'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Get all mics
  getMics(): Observable<Mic[]> {
    return this.http.get<Mic[]>(this.apiUrl);
  }

  // Get a mic by ID
  getMicById(id: number): Observable<Mic> {
    return this.http.get<Mic>(`${this.apiUrl}/${id}`);
  }

  // Create a new mic
  createMic(mic: Mic): Observable<Mic> {
    return this.http.post<Mic>(`${this.apiUrl}/create`, mic);
  }

  // Update an existing mic
  updateMic(id: number, mic: Mic): Observable<Mic> {
    return this.http.put<Mic>(`${this.apiUrl}/${id}`, mic);
  }

  // Delete a mic
  deleteMic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Search mics with filters
  searchMics(filters: { name?: string; startDate?: string; endDate?: string; location?: string }): Observable<Mic[]> {
    let params = new HttpParams();
    if (filters.name) params = params.set('name', filters.name);
    if (filters.startDate) params = params.set('startDate', filters.startDate);
    if (filters.endDate) params = params.set('endDate', filters.endDate);
    if (filters.location) params = params.set('location', filters.location);

    return this.http.get<Mic[]>(`${this.apiUrl}/search`, { params });
  }
}