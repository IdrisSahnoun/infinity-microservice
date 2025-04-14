package tn.esprit.microservice4.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Progression {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "plan_id", nullable = false)
    private PlanEntrainement plan;

    private int userId; // Identifiant de l'utilisateur (peut être remplacé par une entité User si nécessaire)

    private LocalDate dateDebut;
    private LocalDate dateFinPrevue;
    private LocalDate dateDerniereMiseAJour;

    private int seancesTerminees;
    private int totalSeances;

    // Constructeurs, Getters et Setters...

    public Progression() {
    }

    public Progression(PlanEntrainement plan, int userId, LocalDate dateDebut, int totalSeances) {
        this.plan = plan;
        this.userId = userId;
        this.dateDebut = dateDebut;
        this.totalSeances = totalSeances;
        this.seancesTerminees = 0;
        this.dateFinPrevue = dateDebut.plusDays(plan.getDuree());
        this.dateDerniereMiseAJour = LocalDate.now();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public PlanEntrainement getPlan() {
        return plan;
    }

    public void setPlan(PlanEntrainement plan) {
        this.plan = plan;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFinPrevue() {
        return dateFinPrevue;
    }

    public void setDateFinPrevue(LocalDate dateFinPrevue) {
        this.dateFinPrevue = dateFinPrevue;
    }

    public LocalDate getDateDerniereMiseAJour() {
        return dateDerniereMiseAJour;
    }

    public void setDateDerniereMiseAJour(LocalDate dateDerniereMiseAJour) {
        this.dateDerniereMiseAJour = dateDerniereMiseAJour;
    }

    public int getSeancesTerminees() {
        return seancesTerminees;
    }

    public void setSeancesTerminees(int seancesTerminees) {
        this.seancesTerminees = seancesTerminees;
    }

    public int getTotalSeances() {
        return totalSeances;
    }

    public void setTotalSeances(int totalSeances) {
        this.totalSeances = totalSeances;
    }
}