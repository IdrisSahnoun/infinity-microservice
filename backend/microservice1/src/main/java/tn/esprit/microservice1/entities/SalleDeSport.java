package tn.esprit.microservice1.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
public class SalleDeSport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String nom;
    private Integer capacite;
    
    @ManyToMany
    @JoinTable(
        name = "salle_sport",
        joinColumns = @JoinColumn(name = "salle_id"),
        inverseJoinColumns = @JoinColumn(name = "sport_code")
    )
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<Sport> sports = new HashSet<>();
    
    // Helper methods to manage the relationship
    public void addSport(Sport sport) {
        this.sports.add(sport);
        sport.getSalles().add(this);
    }
    
    public void removeSport(Sport sport) {
        this.sports.remove(sport);
        sport.getSalles().remove(this);
    }
} 