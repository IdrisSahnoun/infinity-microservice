import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SportService } from '../../services/sport.service';
import { Sport } from '../../models/sport.model';

@Component({
  selector: 'app-sport-form',
  templateUrl: './sport-form.component.html',
  styleUrls: ['./sport-form.component.css']
})
export class SportFormComponent implements OnInit {
  sportForm: FormGroup;
  isEdit = false;
  sportId: number;
  loading = false;
  submitting = false;
  error = '';
  difficultyLevels = ['Débutant', 'Intermédiaire', 'Avancé'];

  constructor(
    private fb: FormBuilder,
    private sportService: SportService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.sportId = +id;
        this.loadSport(this.sportId);
      }
    });
  }

  initForm(): void {
    this.sportForm = this.fb.group({
      nom: ['', [Validators.required]],
      description: [''],
      niveauDifficulte: ['Débutant', [Validators.required]],
      dureeMoyenne: [30, [Validators.required, Validators.min(1)]],
      prixAbonnementMensuel: [0, [Validators.required, Validators.min(0)]],
      equipementNecessaire: [''],
      imageUrl: ['']
    });
  }

  loadSport(id: number): void {
    this.loading = true;
    this.sportService.getSportById(id).subscribe(
      (sport) => {
        this.sportForm.patchValue(sport);
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load sport details';
        this.loading = false;
        console.error('Error loading sport:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.sportForm.invalid) {
      return;
    }

    const sport: Sport = this.sportForm.value;
    this.submitting = true;

    if (this.isEdit) {
      this.sportService.updateSport(this.sportId, sport).subscribe(
        () => {
          this.submitting = false;
          this.router.navigate(['/microservice1/sports']);
        },
        (error) => {
          this.error = 'Failed to update the sport';
          this.submitting = false;
          console.error('Error updating sport:', error);
        }
      );
    } else {
      this.sportService.createSport(sport).subscribe(
        () => {
          this.submitting = false;
          this.router.navigate(['/microservice1/sports']);
        },
        (error) => {
          this.error = 'Failed to create the sport';
          this.submitting = false;
          console.error('Error creating sport:', error);
        }
      );
    }
  }
} 