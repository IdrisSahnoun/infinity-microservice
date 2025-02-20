package tn.esprit.microservice5.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@Getter
@Setter
public class Abonnement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date_debut;

    private LocalDate date_fin;

        private Double montant;

    public void setId(Long id) {
        this.id = id;
    }
}
