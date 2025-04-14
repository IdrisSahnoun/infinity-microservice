import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event-register',
  templateUrl: './event-register.component.html',
})
export class EventRegisterComponent implements OnInit {
  event!: Event;
  member_id!: number;
  message = '';

  constructor(private route: ActivatedRoute, private eventService: EventService) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.params['id'];
    this.eventService.getEvent(eventId).subscribe(data => {
      this.event = data;
    });
  }

  register() {
    this.eventService.registerToEvent(this.event.event_id, this.member_id).subscribe({
      next: res => this.message = res.message,
      error: err => this.message = err.error?.description || 'Erreur lors de l\'inscription.'
    });
  }
}