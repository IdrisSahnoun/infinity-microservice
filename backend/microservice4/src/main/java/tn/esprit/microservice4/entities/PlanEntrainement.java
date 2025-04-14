package tn.esprit.microservice4.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.Date;

@Entity
public class PlanEntrainement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Le titre est obligatoire")
    private String titre;

    @NotBlank(message = "La description est obligatoire")
    private String description;

    @Min(value = 1, message = "La durée doit être au moins de 1 jour")
    private int duree; // en jours

    private boolean actif = true;

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModified;

    @PrePersist
    @PreUpdate
    public void onUpdate() {
        this.lastModified = new Date();
    }

    public PlanEntrainement() {}

    public PlanEntrainement(int id, String titre, String description, int duree) {
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.duree = duree;
        this.actif = true;
    }

    // Getters et Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getDuree() { return duree; }
    public void setDuree(int duree) { this.duree = duree; }

    public boolean isActif() { return actif; }
    public void setActif(boolean actif) { this.actif = actif; }

    public Date getLastModified() { return lastModified; }
    public void setLastModified(Date lastModified) { this.lastModified = lastModified; }
}
