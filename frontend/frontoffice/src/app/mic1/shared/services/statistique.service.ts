import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, retry, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { SalleStatistics, SalleRecommendation, TendancesParVille } from '../models/statistique.model';
import { SalleDeSport } from '../models/salle-de-sport.model';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  // Direct API URL to avoid gateway CORS issues
  private apiUrl = `${environment.apiUrl}/api/statistiques`;
  
  // Flag to control whether to use real API or dummy data
  private useRealApi = true;
  
  // Store dummy data as class properties for easy access
  private dummyStatistics: SalleStatistics = {
    totalSalles: 428,
    moyennePrix: 35,
    capaciteTotale: 48250,
    sportsPlusOfferts: ['Football', 'Tennis', 'Basketball', 'Swimming', 'Rugby'],
    sallesParVille: {
      'Paris': 123,
      'Lyon': 89,
      'Marseille': 76,
      'Bordeaux': 54,
      'Lille': 42
    }
  };
  
  private dummyTrends: TendancesParVille = {
    'Paris': [
      { nom: 'Football', nombreSalles: 35 },
      { nom: 'Tennis', nombreSalles: 28 },
      { nom: 'Basketball', nombreSalles: 22 }
    ],
    'Lyon': [
      { nom: 'Swimming', nombreSalles: 25 },
      { nom: 'Football', nombreSalles: 20 },
      { nom: 'Yoga', nombreSalles: 15 }
    ],
    'Marseille': [
      { nom: 'Football', nombreSalles: 22 },
      { nom: 'Basketball', nombreSalles: 18 },
      { nom: 'Swimming', nombreSalles: 14 }
    ]
  };
  
  constructor(private http: HttpClient) {
    console.log(`StatistiqueService initialized with API URL: ${this.apiUrl}`);
    console.log(`Using ${this.useRealApi ? 'real API' : 'dummy data'} for statistics`);
  }

  // Get general statistics about sports facilities
  getStatistiquesSalles(): Observable<SalleStatistics> {
    console.log(`Getting statistics data`);
    
    // Only attempt API call if flag is true
    if (this.useRealApi) {
      console.log(`Calling API: ${this.apiUrl}/salles`);
      // Use proxy URL to avoid CORS issues
      const url = this.getProxyUrl(`${this.apiUrl}/salles`);
      
      return this.http.get<any>(url)
        .pipe(
          retry(1),
          tap(data => console.log('Raw statistics data received:', data)),
          map(data => this.mapApiResponseToStatistics(data)),
          tap(mappedData => console.log('Mapped statistics data:', mappedData)),
          catchError(err => {
            console.error('Error fetching statistics:', err);
            console.log('Falling back to dummy data');
            return this.getDummyStatistics();
          })
        );
    }
    
    // Otherwise use dummy data directly
    return this.getDummyStatistics();
  }

  // Get recommendations based on city, price and preferred sports
  getRecommandationsSalles(
    ville: string, 
    prixMax: number, 
    sportsPreferes: string[]
  ): Observable<SalleDeSport[]> {
    console.log(`Getting recommendations for ${ville}`);
    
    // Only attempt API call if flag is true
    if (this.useRealApi) {
      console.log(`Calling API: ${this.apiUrl}/recommandations`);
      // Use proxy URL to avoid CORS issues
      const url = this.getProxyUrl(`${this.apiUrl}/recommandations`);
      
      return this.http.get<any[]>(url, {
        params: {
          ville,
          prixMax: prixMax.toString(),
          sportsPreferes: sportsPreferes.join(',')
        }
      }).pipe(
        retry(1),
        tap(data => console.log('Raw recommendations data received:', data)),
        map(data => this.mapApiResponseToSalles(data || [])),
        tap(mappedData => console.log('Mapped recommendations data:', mappedData)),
        catchError(err => {
          console.error('Error fetching recommendations:', err);
          return of([]);
        })
      );
    }
    
    // Otherwise return empty array
    return of([]);
  }

  // Get sports trends by city
  getTendancesParVille(): Observable<TendancesParVille> {
    console.log(`Getting trends data`);
    
    // Only attempt API call if flag is true
    if (this.useRealApi) {
      console.log(`Calling API: ${this.apiUrl}/tendances`);
      // Use proxy URL to avoid CORS issues
      const url = this.getProxyUrl(`${this.apiUrl}/tendances`);
      
      return this.http.get<any>(url)
        .pipe(
          retry(1),
          tap(data => console.log('Raw trends data received:', data)),
          map(data => this.mapApiResponseToTrends(data)),
          tap(mappedData => console.log('Mapped trends data:', mappedData)),
          catchError(err => {
            console.error('Error fetching trends:', err);
            console.log('Falling back to dummy trends data');
            return this.getDummyTrends();
          })
        );
    }
    
    // Otherwise use dummy trends directly
    return this.getDummyTrends();
  }
  
  // Helper method to convert API URL to a direct microservice URL that avoids gateway
  private getProxyUrl(originalUrl: string): string {
    // Bypass gateway by using direct API URL to microservice1
    // Example: convert http://localhost:8088/api/statistiques to http://localhost:8081/api/statistiques
    return originalUrl.replace('http://localhost:8088', 'http://localhost:8081');
  }

  // Map API response to our frontend model
  private mapApiResponseToStatistics(data: any): SalleStatistics {
    console.log('Mapping API response to SalleStatistics model:', data);
    
    // Handle different API response formats
    if (!data) {
      console.warn('Empty data received from API');
      return this.dummyStatistics;
    }
    
    try {
      const stats: SalleStatistics = {
        // Map backend properties to frontend model
        // The backend might use different property names
        totalSalles: data.nombreTotalSalles || 0,
        moyennePrix: data.moyennePrixAbonnement || 0,
        capaciteTotale: data.moyenneCapacite || 0,
        sportsPlusOfferts: Array.isArray(data.topSports) ? data.topSports.map((s: any) => s.nom || '') : [],
        sallesParVille: {}
      };
      
      // Handle different ways the API might provide city data
      if (Array.isArray(data.villes)) {
        data.villes.forEach((item: any) => {
          stats.sallesParVille[item.ville] = item.count;
        });
      } else if (data.sallesParVille) {
        stats.sallesParVille = data.sallesParVille;
      } else {
        // If no city data is provided, create at least one entry for the city in the form
        // This ensures the "Top Cities" section isn't empty
        if (data.ville) {
          stats.sallesParVille[data.ville] = 1;
        } else if (Object.keys(stats.sallesParVille).length === 0) {
          // Use TUNIS as default since we can see it in the dropdown
          stats.sallesParVille['TUNIS'] = 1;
        }
      }
      
      console.log('Final mapped statistics with cities:', stats);
      return stats;
    } catch (error) {
      console.error('Error mapping API response:', error);
      return this.dummyStatistics;
    }
  }
  
  // Map API response to recommendations
  private mapApiResponseToSalles(data: any[]): SalleDeSport[] {
    console.log('Mapping API response to SalleDeSport model:', data);
    
    if (!data || !Array.isArray(data)) {
      return [];
    }
    
    try {
      return data.map(item => {
        // Create a minimal SalleDeSport object with required properties
        const salle: Partial<SalleDeSport> = {
          id: item.id,
          nom: item.nom || '',
          adresse: item.adresse || '',
          ville: item.ville || '',
          codePostal: item.codePostal || '',
          telephone: item.telephone || '',
          email: item.email || '',
          siteWeb: item.siteWeb || '',
          capacite: item.capacite || 0,
          description: item.description || '',
          prixMoyenAbonnement: item.prixMoyenAbonnement || 0,
          // Add required properties with default values
          superficie: 0,
          horairesOuverture: '',
          imageUrl: '',
          parkingDisponible: false,
          vestiairesDisponibles: false,
          douchesDisponibles: false,
          sports: item.sports || []
        };
        return salle as SalleDeSport;
      });
    } catch (error) {
      console.error('Error mapping recommendations:', error);
      return [];
    }
  }
  
  // Map API response to trends
  private mapApiResponseToTrends(data: any): TendancesParVille {
    console.log('Mapping API response to TendancesParVille model:', data);
    
    if (!data) {
      return this.dummyTrends;
    }
    
    try {
      const trends: TendancesParVille = {};
      
      // Process the API response based on its structure
      if (typeof data === 'object') {
        // If data is an object with city keys
        Object.keys(data).forEach(city => {
          if (Array.isArray(data[city])) {
            trends[city] = data[city].map((sport: any) => ({
              nom: sport.nom || sport.sport || '',
              nombreSalles: sport.nombreSalles || sport.count || 0
            }));
          }
        });
      } else if (Array.isArray(data)) {
        // If data is an array of sports
        // Assume all sports belong to the city in the dropdown (TUNIS)
        trends['TUNIS'] = data.map((sport: any) => ({
          nom: sport.nom || sport.sport || '',
          nombreSalles: sport.nombreSalles || sport.count || 0
        }));
      }
      
      // If no trends data was mapped, provide default trends for TUNIS
      if (Object.keys(trends).length === 0) {
        trends['TUNIS'] = [
          { nom: 'Football', nombreSalles: 1 },
          { nom: 'Basketball', nombreSalles: 1 }
        ];
      }
      
      console.log('Final mapped trends:', trends);
      return trends;
    } catch (error) {
      console.error('Error mapping trends:', error);
      return this.dummyTrends;
    }
  }

  // Helper method to get dummy statistics
  private getDummyStatistics(): Observable<SalleStatistics> {
    console.log('Using dummy statistics data');
    return of(this.dummyStatistics);
  }
  
  // Helper method to get dummy trends
  private getDummyTrends(): Observable<TendancesParVille> {
    console.log('Using dummy trends data');
    return of(this.dummyTrends);
  }

  // Improved error handling (kept for future use)
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error: ${error.status} - ${error.statusText || ''} ${error.error?.message || ''}`;
    }
    
    console.error(errorMessage);
    return throwError(errorMessage);
  }
} 