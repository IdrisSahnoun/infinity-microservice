import { Component, OnInit } from '@angular/core';
import { StatistiqueService } from '../../shared/services/statistique.service';
import { SalleStatistics, TendancesParVille, SportTendance } from '../../shared/models/statistique.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-statistiques-dashboard',
  templateUrl: './statistiques-dashboard.component.html',
  styleUrls: ['./statistiques-dashboard.component.css']
})
export class StatistiquesDashboardComponent implements OnInit {
  loading = true;
  error = '';
  statistics: SalleStatistics | null = null;
  tendancesParVille: TendancesParVille | null = null;
  apiUrl: string;
  envApiUrl: string = environment.apiUrl;
  timestamp: Date = new Date();
  
  constructor(private statistiqueService: StatistiqueService) { 
    console.log('StatistiquesDashboardComponent initialized');
    this.apiUrl = `${environment.apiUrl}/api/statistiques`;
  }

  ngOnInit(): void {
    console.log('StatistiquesDashboardComponent ngOnInit');
    this.loadStatistics();
    this.loadTrends();
  }
  
  loadStatistics(): void {
    console.log('Loading statistics...');
    this.loading = true;
    this.statistiqueService.getStatistiquesSalles().subscribe(
      data => {
        console.log('Statistics loaded successfully:', data);
        this.statistics = data;
        this.loading = false;
      },
      error => {
        console.error('Error loading statistics:', error);
        this.error = typeof error === 'string' ? error : 'Failed to load statistics. Please try again later.';
        this.loading = false;
        
        // Fallback to dummy data for demo purposes if API fails
        this.loadDummyData();
      }
    );
  }

  loadTrends(): void {
    console.log('Loading trends...');
    this.statistiqueService.getTendancesParVille().subscribe(
      data => {
        console.log('Trends loaded successfully:', data);
        this.tendancesParVille = data;
      },
      error => {
        console.error('Error loading trends:', error);
        // Load dummy trends data if API fails
        this.loadDummyTrends();
      }
    );
  }
  
  // Helper methods for template
  getTopCities(): {name: string, count: number}[] {
    if (!this.statistics || !this.statistics.sallesParVille) {
      return [];
    }
    
    return Object.entries(this.statistics.sallesParVille)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }
  
  getCityNames(): string[] {
    if (!this.tendancesParVille) {
      return ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille']; // Fallback
    }
    
    return Object.keys(this.tendancesParVille);
  }
  
  // Fallback method to load dummy data if API fails
  private loadDummyData(): void {
    console.log('Loading dummy statistics data...');
    this.statistics = {
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
    this.loading = false;
  }
  
  private loadDummyTrends(): void {
    console.log('Loading dummy trends data...');
    this.tendancesParVille = {
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
  }

  // Add a method to handle city selection
  onCitySelect(city: string): void {
    console.log(`City selected: ${city}`);
    // After a city is selected, we should display its trends
    this.selectedCity = city;
    
    if (this.tendancesParVille && this.tendancesParVille[city]) {
      console.log(`Trends found for ${city}:`, this.tendancesParVille[city]);
      this.cityTrends = this.tendancesParVille[city];
    } else {
      console.log(`No trends found for ${city}`);
      this.cityTrends = [];
    }
  }
  
  // Add property to track selected city and its trends
  selectedCity: string = '';
  cityTrends: any[] = [];
} 