import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
})
export class AdminEventsComponent implements OnInit {
  events: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8088/api/events').subscribe(data => {
      this.events = data;
    });
  }
}
