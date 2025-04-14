import { Component, OnInit } from '@angular/core';
import { PlanEntrainement } from 'app/models/models';
import { ApiService } from 'app/services/api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  plans: PlanEntrainement[] = [];
  newPlan: PlanEntrainement = { id: 0, titre: '', description: '', duree: 0 };
  editMode = false;
  selectedPlanId: number | null = null;
  keyword = '';
  sortBy = 'titre';
  stats: any = {};

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    forkJoin({
      plans: this.apiService.getAllPlans(),
      stats: this.apiService.getStats()
    }).subscribe(({ plans, stats }) => {
      this.plans = plans;
      this.stats = stats;
    });
  }

  addPlan(): void {
    this.apiService.addPlan(this.newPlan).subscribe(() => {
      this.loadPlans();
      this.resetForm();
    });
  }

  deletePlan(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce plan ?')) {
      this.apiService.deletePlan(id).subscribe(() => this.loadPlans());
    }
  }

  startEdit(plan: PlanEntrainement): void {
    this.newPlan = { ...plan };
    this.editMode = true;
    this.selectedPlanId = plan.id;
  }

  updatePlan(): void {
    if (this.selectedPlanId !== null) {
      this.apiService.updatePlan(this.selectedPlanId, this.newPlan).subscribe(() => {
        this.loadPlans();
        this.resetForm();
      });
    }
  }

  toggleActif(id: number): void {
    this.apiService.toggleActif(id).subscribe(() => this.loadPlans());
  }

  resetForm(): void {
    this.newPlan = { id: 0, titre: '', description: '', duree: 0 };
    this.editMode = false;
    this.selectedPlanId = null;
  }

  search(): void {
    if (this.keyword.trim()) {
      this.apiService.searchPlans(this.keyword).subscribe(data => this.plans = data);
    } else {
      this.loadPlans();
    }
  }

  sort(): void {
    this.apiService.sortPlans(this.sortBy).subscribe(data => this.plans = data);
  }

  private loadPlans(): void {
    this.apiService.getAllPlans().subscribe(data => this.plans = data);
  }

  private loadStats(): void {
    this.apiService.getStats().subscribe(data => this.stats = data);
  }
}
