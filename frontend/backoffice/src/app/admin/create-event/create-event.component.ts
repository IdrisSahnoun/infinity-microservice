import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
})
export class CreateEventComponent {
  event = {
    name: '',
    description: '',
    date: '',
    location: '',
    max_participants: 10,
  };

  constructor(private http: HttpClient, private router: Router) {}

  createEvent() {
    this.http.post('http://localhost:8088/api/events', this.event).subscribe(() => {
      this.router.navigate(['/admin/events']);
    });
  }
}
