import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanService, PlanEntrainement } from 'src/app/services/plan.service';

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css']
})
export class PlanDetailsComponent implements OnInit {
  planId!: number;
  plan?: PlanEntrainement;
  suggestions: PlanEntrainement[] = [];

  constructor(
    private route: ActivatedRoute,
    private planService: PlanService
  ) {}

  ngOnInit(): void {
    this.planId = Number(this.route.snapshot.paramMap.get('id'));
    this.planService.getPlan(this.planId).subscribe(data => {
      this.plan = data;
    });
    this.planService.getSimilarPlans(this.planId).subscribe(data => {
      this.suggestions = data;
    });
  }
}