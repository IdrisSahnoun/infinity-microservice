import { Component, OnInit } from '@angular/core';
import { SportService } from '../../services/sport.service';
import { Sport } from '../../models/sport.model';

@Component({
  selector: 'app-sport-list',
  templateUrl: './sport-list.component.html',
  styleUrls: ['./sport-list.component.css']
})
export class SportListComponent implements OnInit {
  sports: Sport[] = [];
  loading = false;
  error = '';

  constructor(private sportService: SportService) { }

  ngOnInit(): void {
    this.loadSports();
  }

  loadSports(): void {
    this.loading = true;
    this.sportService.getAllSports().subscribe(
      (data) => {
        this.sports = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load sports';
        this.loading = false;
        console.error('Error loading sports:', error);
      }
    );
  }

  deleteSport(id: number): void {
    if (confirm('Are you sure you want to delete this sport?')) {
      this.sportService.deleteSport(id).subscribe(
        () => {
          this.sports = this.sports.filter(sport => sport.codeSport !== id);
        },
        (error) => {
          this.error = 'Failed to delete the sport';
          console.error('Error deleting sport:', error);
        }
      );
    }
  }
} 