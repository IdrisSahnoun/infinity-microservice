import { Component, OnInit } from '@angular/core';
import { PlanService, PlanEntrainement } from 'src/app/services/plan.service';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {
  plans: PlanEntrainement[] = [];
  filteredPlans: PlanEntrainement[] = [];
  searchTerm: string = '';

  constructor(private planService: PlanService) {}

  ngOnInit(): void {
    this.planService.getAllPlans().subscribe(data => {
      this.plans = data;
      this.filteredPlans = data;
    });
  }

  searchPlans(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredPlans = this.plans.filter(plan =>
      plan.titre.toLowerCase().includes(term)
    );
  }
}