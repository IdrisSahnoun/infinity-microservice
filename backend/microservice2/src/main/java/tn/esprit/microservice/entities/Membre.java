package tn.esprit.microservice.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity

public class Membre {
    @Id
    @GeneratedValue
    private int id;
    private String firstName;
    private String lastName;
    private String adresse;
    private String cin;
    private int poids;
    private int taille;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public int getPoids() {
        return poids;
    }

    public void setPoids(int poids) {
        this.poids = poids;
    }

    public int getTaille() {
        return taille;
    }

    public void setTaille(int taille) {
        this.taille = taille;
    }

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    private String sexe;


    public Membre() {
        super();
    }
    public Membre(String firstName, String lastName, String adresse, String cin, int poids, int taille, String sexe) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.adresse = adresse;

        this.cin = cin;
        this.poids = poids;
        this.taille = taille;
        this.sexe = sexe;
    }
}
