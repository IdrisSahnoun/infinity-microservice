import { Component, OnInit } from '@angular/core';
import { AbonnementService, Abonnement } from 'src/service/mic5/abonnement.service';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.css']
})
export class AbonnementComponent implements OnInit {
    stats: any; // Variable pour stocker les statistiques
    isEditing: boolean = false; // Variable pour contrôler l'affichage du formulaire d'édition
  abonnements: Abonnement[] = []; // Liste des abonnements
  errorMessage: string = ''; // Message d'erreur
  newAbonnement: Abonnement = {
    date_debut: '',
    date_fin: '',
    montant: 0
  }; // Objet pour créer un nouvel abonnement

  constructor(private abonnementService: AbonnementService) {}

  ngOnInit(): void {
    this.getAllAbonnements(); // Charger tous les abonnements au démarrage
    this.getAllAbonnements(); // Charger tous les abonnements au démarrage
    this.getAbonnementStats(); // Charger les statistiques
  }

  // Récupérer tous les abonnements
  getAllAbonnements(): void {
    this.abonnementService.getAllAbonnements().subscribe({
      next: (data) => {
        console.log('Abonnements récupérés :', data); // Vérifiez les données
        this.abonnements = data;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la récupération des abonnements.';
        console.error(err);
      }
    });
  }

  // Créer un nouvel abonnement
  createAbonnement(): void {
    console.log('Données envoyées :', this.newAbonnement); // Vérifiez les données
    this.abonnementService.createAbonnement(this.newAbonnement).subscribe({
      next: (data) => {
        this.abonnements.push(data); // Ajouter le nouvel abonnement à la liste
        this.newAbonnement = { date_debut: '', date_fin: '', montant: 0 }; // Réinitialiser le formulaire
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la création de l’abonnement.';
        console.error('Erreur backend :', err); // Affichez l'erreur
      }
    });
  }

  // Supprimer un abonnement
  deleteAbonnement(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID non défini, suppression impossible.');
      return;
    }
  
    console.log('Tentative de suppression de l’abonnement avec ID :', id); // Log ID
    this.abonnementService.deleteAbonnement(id).subscribe({
      next: () => {
        console.log('Abonnement supprimé avec succès, ID :', id); // Log succès
        this.abonnements = this.abonnements.filter((abonnement) => abonnement.id !== id);
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la suppression de l’abonnement.';
        console.error('Erreur backend :', err); // Log erreur
      }
    });
  }

  editAbonnement(abonnement: Abonnement): void {
    this.isEditing = true; // Active le mode édition
    this.newAbonnement = { ...abonnement }; // Clone l'abonnement sélectionné
    console.log('Mode édition activé pour :', abonnement); // Vérifiez les données dans la console
  }
  
  cancelEdit(): void {
    this.isEditing = false; // Désactive le mode édition
    this.newAbonnement = { date_debut: '', date_fin: '', montant: 0 }; // Réinitialise le formulaire
    console.log('Mode édition annulé'); // Log pour vérifier
  }
  updateAbonnement(id: number): void {
    console.log('Données envoyées pour la mise à jour :', this.newAbonnement); // Vérifiez les données
    this.abonnementService.updateAbonnement(id, this.newAbonnement).subscribe({
      next: (updatedAbonnement) => {
        console.log('Abonnement mis à jour avec succès :', updatedAbonnement);
        const index = this.abonnements.findIndex((abonnement) => abonnement.id === id);
        if (index !== -1) {
          this.abonnements[index] = updatedAbonnement;
        }
        this.cancelEdit(); // Réinitialise le formulaire et désactive le mode édition
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la mise à jour de l’abonnement.';
        console.error('Erreur backend :', err);
      }
    });
  }
  getAbonnementStats(): void {
    this.abonnementService.getAbonnementStats().subscribe({
      next: (data) => {
        console.log('Statistiques des abonnements :', data); // Vérifiez les données
        this.stats = data;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la récupération des statistiques.';
        console.error('Erreur backend :', err);
      }
    });
  }
}