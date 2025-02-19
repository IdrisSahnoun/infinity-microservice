package tn.esprit.microservice1.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Sport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer codeSport;
    
    private String nom;
    
    @JsonIgnore
    @ManyToMany(mappedBy = "sports")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<SalleDeSport> salles = new HashSet<>();
} 