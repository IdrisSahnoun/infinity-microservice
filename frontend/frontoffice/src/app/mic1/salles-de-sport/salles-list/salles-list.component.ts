import { Component, OnInit } from '@angular/core';
import { SalleDeSportService } from '../../shared/services/salle-de-sport.service';
import { SalleDeSport } from '../../shared/models/salle-de-sport.model';

@Component({
  selector: 'app-salles-list',
  templateUrl: './salles-list.component.html',
  styleUrls: ['./salles-list.component.css']
})
export class SallesListComponent implements OnInit {
  salles: SalleDeSport[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  filteredSalles: SalleDeSport[] = [];
  selectedVille = '';
  villes: string[] = [];

  constructor(private salleService: SalleDeSportService) { }

  ngOnInit(): void {
    this.loadSalles();
  }

  loadSalles(): void {
    this.loading = true;
    this.salleService.getAllSalles().subscribe(
      (data) => {
        this.salles = data;
        this.filteredSalles = [...this.salles];
        this.extractVilles();
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load sports facilities';
        this.loading = false;
        console.error('Error loading salles:', error);
      }
    );
  }

  extractVilles(): void {
    const villesSet = new Set<string>();
    this.salles.forEach(salle => villesSet.add(salle.ville));
    this.villes = Array.from(villesSet).sort();
  }

  filterByVille(ville: string): void {
    this.selectedVille = ville;
    this.applyFilters();
  }

  search(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredSalles = this.salles.filter(salle => {
      const matchesSearch = this.searchTerm ? 
        salle.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        salle.description.toLowerCase().includes(this.searchTerm.toLowerCase()) :
        true;
        
      const matchesVille = this.selectedVille ? 
        salle.ville === this.selectedVille :
        true;
        
      return matchesSearch && matchesVille;
    });
  }
} 