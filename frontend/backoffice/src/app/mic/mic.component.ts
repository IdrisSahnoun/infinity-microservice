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
  allMics: Mic[] = []; // Store all competitions for local filtering
  searchQuery: string = '';

  constructor(private micService: MicService) {}

  ngOnInit(): void {
    this.loadMics();
  }

  // Load all mics
  loadMics(): void {
    this.micService.getMics().subscribe(
      (data) => {
        console.log('Fetched mics:', data);
        this.mics = data;
        this.allMics = [...data]; // Keep a copy of all data
      },
      (error) => {
        console.error('Error fetching mics:', error);
      }
    );
  }

  // Search mics across all fields
  searchMics(): void {
    if (!this.searchQuery.trim()) {
      this.mics = [...this.allMics]; // Show all if search is empty
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();
    this.mics = this.allMics.filter(mic => 
      mic.name.toLowerCase().includes(query) ||
      mic.description.toLowerCase().includes(query) ||
      mic.location.toLowerCase().includes(query) ||
      this.formatDate(mic.startDate).includes(query) ||
      this.formatDate(mic.endDate).includes(query)
    );
  }

  // Format date for searching
  private formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
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
    this.searchQuery = '';
    this.mics = [...this.allMics]; // Reset to show all competitions
  }
}