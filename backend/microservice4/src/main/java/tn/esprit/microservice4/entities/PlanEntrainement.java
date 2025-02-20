package tn.esprit.microservice4.entities;

import jakarta.persistence.*;

@Entity
public class PlanEntrainement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String titre;
    private String description;
    private int duree; // en jours

    // Constructeurs

    public PlanEntrainement() {
    }

    public PlanEntrainement(int id, String titre, String description, int duree) {
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.duree = duree;
    }

    // Getters et Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getDuree() {
        return duree;
    }

    public void setDuree(int duree) {
        this.duree = duree;
    }
}
