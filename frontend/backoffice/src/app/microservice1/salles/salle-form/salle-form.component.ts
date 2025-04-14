import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalleDeSportService } from '../../services/salle-de-sport.service';
import { SalleDeSport } from '../../models/salle-de-sport.model';
import { SportService } from '../../services/sport.service';
import { Sport } from '../../models/sport.model';

@Component({
  selector: 'app-salle-form',
  templateUrl: './salle-form.component.html',
  styleUrls: ['./salle-form.component.css']
})
export class SalleFormComponent implements OnInit {
  salleForm: FormGroup;
  isEdit = false;
  salleId: number;
  loading = false;
  submitting = false;
  error = '';
  allSports: Sport[] = [];
  selectedSports: number[] = [];

  constructor(
    private fb: FormBuilder,
    private salleService: SalleDeSportService,
    private sportService: SportService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadSports();
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.salleId = +id;
        this.loadSalle(this.salleId);
      }
    });
  }

  initForm(): void {
    this.salleForm = this.fb.group({
      nom: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      codePostal: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      siteWeb: [''],
      capacite: [0, [Validators.required, Validators.min(1)]],
      superficie: [0, [Validators.required, Validators.min(1)]],
      horairesOuverture: [''],
      description: [''],
      imageUrl: [''],
      prixMoyenAbonnement: [0, [Validators.required, Validators.min(0)]],
      parkingDisponible: [false],
      vestiairesDisponibles: [false],
      douchesDisponibles: [false]
    });
  }

  loadSalle(id: number): void {
    this.loading = true;
    this.salleService.getSalleById(id).subscribe(
      (salle) => {
        this.salleForm.patchValue(salle);
        if (salle.sports) {
          this.selectedSports = salle.sports.map(sport => sport.codeSport);
        }
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load facility details';
        this.loading = false;
        console.error('Error loading salle:', error);
      }
    );
  }

  loadSports(): void {
    this.sportService.getAllSports().subscribe(
      (sports) => {
        this.allSports = sports;
      },
      (error) => {
        console.error('Error loading sports:', error);
      }
    );
  }

  toggleSport(sportId: number): void {
    const index = this.selectedSports.indexOf(sportId);
    if (index > -1) {
      this.selectedSports.splice(index, 1);
    } else {
      this.selectedSports.push(sportId);
    }
  }

  isSportSelected(sportId: number): boolean {
    return this.selectedSports.includes(sportId);
  }

  onSubmit(): void {
    if (this.salleForm.invalid) {
      return;
    }

    const salle: SalleDeSport = this.salleForm.value;
    this.submitting = true;

    if (this.isEdit) {
      this.salleService.updateSalle(this.salleId, salle).subscribe(
        (updatedSalle) => {
          this.handleSportAssignments(updatedSalle.id);
        },
        (error) => {
          this.error = 'Failed to update the facility';
          this.submitting = false;
          console.error('Error updating salle:', error);
        }
      );
    } else {
      this.salleService.createSalle(salle).subscribe(
        (createdSalle) => {
          this.handleSportAssignments(createdSalle.id);
        },
        (error) => {
          this.error = 'Failed to create the facility';
          this.submitting = false;
          console.error('Error creating salle:', error);
        }
      );
    }
  }

  private handleSportAssignments(salleId: number): void {
    // This is a simple implementation. In a real app, you would need to handle 
    // additions and removals more efficiently
    const promises = this.selectedSports.map(sportId => 
      this.sportService.assignSportToSalle(sportId, salleId).toPromise()
    );
    
    Promise.all(promises)
      .then(() => {
        this.submitting = false;
        this.router.navigate(['/microservice1/salles']);
      })
      .catch(error => {
        this.error = 'Facility saved but failed to assign sports';
        this.submitting = false;
        console.error('Error assigning sports:', error);
      });
  }
} 