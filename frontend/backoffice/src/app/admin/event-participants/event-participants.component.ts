import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
})
export class EventParticipantsComponent implements OnInit {
  event: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:8088/api/events/${eventId}`).subscribe(data => {
      this.event = data;
    });
  }
}
