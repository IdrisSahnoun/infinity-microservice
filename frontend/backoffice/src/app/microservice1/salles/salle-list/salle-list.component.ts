import { Component, OnInit } from '@angular/core';
import { SalleDeSportService } from '../../services/salle-de-sport.service';
import { SalleDeSport } from '../../models/salle-de-sport.model';

@Component({
  selector: 'app-salle-list',
  templateUrl: './salle-list.component.html',
  styleUrls: ['./salle-list.component.css']
})
export class SalleListComponent implements OnInit {
  salles: SalleDeSport[] = [];
  loading = false;
  error = '';

  constructor(private salleService: SalleDeSportService) { }

  ngOnInit(): void {
    this.loadSalles();
  }

  loadSalles(): void {
    this.loading = true;
    this.salleService.getAllSalles().subscribe(
      (data) => {
        this.salles = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load sports facilities';
        this.loading = false;
        console.error('Error loading salles:', error);
      }
    );
  }

  deleteSalle(id: number): void {
    if (confirm('Are you sure you want to delete this sports facility?')) {
      this.salleService.deleteSalle(id).subscribe(
        () => {
          this.salles = this.salles.filter(salle => salle.id !== id);
        },
        (error) => {
          this.error = 'Failed to delete the sports facility';
          console.error('Error deleting salle:', error);
        }
      );
    }
  }
} 