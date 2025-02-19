package tn.esprit.microservice.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data // Generates getters, setters, toString, equals, and hashCode
@NoArgsConstructor // Generates a no-args constructor
@AllArgsConstructor // Generates a constructor with all fields
@Entity
public class Competition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private String location;
}
