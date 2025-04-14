import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MicService } from '../../services/mic.service';
import { Mic } from '../../models/mic.model';

@Component({
  selector: 'app-add-mic',
  templateUrl: './add-mic.component.html',
  styleUrls: ['./add-mic.component.scss'],
})
export class AddMicComponent {
  mic: Mic = {
    id: null,
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
  };

  constructor(private micService: MicService, private router: Router) {}

  onSubmit(): void {
    // Format dates to include seconds (e.g., "2023-12-01T09:00:00")
    this.mic.startDate = this.formatDate(this.mic.startDate);
    this.mic.endDate = this.formatDate(this.mic.endDate);

    console.log('Submitting competition:', this.mic); // Debugging log
    this.micService.createMic(this.mic).subscribe(
      (response) => {
        console.log('Competition added successfully:', response);
        this.router.navigate(['/mic']);
      },
      (error) => {
        console.error('Error adding competition:', error);
      }
    );
  }

  private formatDate(date: string): string {
    const parsedDate = new Date(date);
    return parsedDate.toISOString().split('.')[0]; // Remove milliseconds
  }
}