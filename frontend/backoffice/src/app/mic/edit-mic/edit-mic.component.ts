import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MicService } from '../../services/mic.service';
import { Mic } from '../../models/mic.model';

@Component({
  selector: 'app-edit-mic',
  templateUrl: './edit-mic.component.html',
  styleUrls: ['./edit-mic.component.scss'],
})
export class EditMicComponent implements OnInit {
  mic: Mic = {
    id: 0,
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
  };

  constructor(
    private micService: MicService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.micService.getMicById(id).subscribe(
      (data) => {
        // Convert ISO strings to local date-time strings for the form
        this.mic = {
          ...data,
          startDate: new Date(data.startDate).toISOString().slice(0, 16), // Format for datetime-local input
          endDate: new Date(data.endDate).toISOString().slice(0, 16),
        };
      },
      (error) => {
        console.error('Error fetching competition:', error);
      }
    );
  }

  onSubmit(): void {
    // Format dates to ISO strings
    this.mic.startDate = new Date(this.mic.startDate).toISOString();
    this.mic.endDate = new Date(this.mic.endDate).toISOString();

    this.micService.updateMic(this.mic.id, this.mic).subscribe(
      (response) => {
        console.log('Competition updated successfully:', response);
        this.router.navigate(['/mic']);
      },
      (error) => {
        console.error('Error updating competition:', error);
      }
    );
  }
}