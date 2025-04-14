import { Component, OnInit } from '@angular/core';
import { MicService } from '../services/mic.service';
import { Mic } from '../models/mic.model';

@Component({
  selector: 'app-mic',
  templateUrl: './mic.component.html',
  styleUrls: ['./mic.component.scss'],
})
export class MicComponent implements OnInit {
  mics: Mic[] = [];
  searchFilters = {
    name: '',
    startDate: '',
    endDate: '',
    location: '',
  };

  constructor(private micService: MicService) {}

  ngOnInit(): void {
    this.micService.getMics().subscribe(
      (data) => {
        console.log('Fetched mics:', data);
        this.mics = data;
      },
      (error) => {
        console.error('Error fetching mics:', error);
      }
    );
  }

  // Load all mics
  loadMics(): void {
    this.micService.getMics().subscribe(
      (data) => {
        this.mics = data;
      },
      (error) => {
        console.error('Error fetching mics:', error);
      }
    );
  }

  // Search mics
  searchMics(): void {
    this.micService.searchMics(this.searchFilters).subscribe(
      (data) => {
        this.mics = data;
      },
      (error) => {
        console.error('Error searching mics:', error);
      }
    );
  }
  deleteMic(id: number): void {
    if (confirm('Are you sure you want to delete this competition?')) {
      this.micService.deleteMic(id).subscribe(
        () => {
          console.log('Competition deleted successfully');
          this.loadMics(); // Reload the list
        },
        (error) => {
          console.error('Error deleting competition:', error);
        }
      );
    }
  }
  resetSearch(): void {
    this.searchFilters = {
      name: '',
      startDate: '',
      endDate: '',
      location: '',
    };
    this.loadMics(); // Reset to show all competitions
  }
}