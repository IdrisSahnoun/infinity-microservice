import { Component, OnInit } from '@angular/core';
import { StatistiqueService } from '../../shared/services/statistique.service';
import { SalleStatistics, TendancesParVille, SportTendance } from '../../shared/models/statistique.model';

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
  
  constructor(private statistiqueService: StatistiqueService) { 
    console.log('StatistiquesDashboardComponent initialized');
  }

  ngOnInit(): void {
    console.log('StatistiquesDashboardComponent.ngOnInit()');
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
  
  // Fallback method to load dummy trends if API fails
  private loadDummyTrends(): void {
    console.log('Loading dummy trends data...');
    this.tendancesParVille = {
      'Paris': [
        { sport: 'Tennis', nombreSalles: 45, popularite: 0.32 },
        { sport: 'Football', nombreSalles: 38, popularite: 0.28 },
        { sport: 'Swimming', nombreSalles: 22, popularite: 0.15 }
      ],
      'Lyon': [
        { sport: 'Football', nombreSalles: 32, popularite: 0.35 },
        { sport: 'Basketball', nombreSalles: 25, popularite: 0.25 },
        { sport: 'Tennis', nombreSalles: 18, popularite: 0.20 }
      ],
      'Marseille': [
        { sport: 'Football', nombreSalles: 30, popularite: 0.40 },
        { sport: 'Rugby', nombreSalles: 18, popularite: 0.22 },
        { sport: 'Swimming', nombreSalles: 15, popularite: 0.18 }
      ]
    };
  }

  // Helper method to get top sports from statistics
  get topSports(): string[] {
    return this.statistics?.sportsPlusOfferts || [];
  }

  // Helper method to get cities with the most facilities
  get topCities(): [string, number][] {
    if (!this.statistics?.sallesParVille) return [];
    
    return Object.entries(this.statistics.sallesParVille)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }
  
  // Helper method to get trend data for a specific city
  getTrendsForCity(city: string): SportTendance[] {
    if (!this.tendancesParVille || !this.tendancesParVille[city]) {
      return [];
    }
    return this.tendancesParVille[city];
  }
} 