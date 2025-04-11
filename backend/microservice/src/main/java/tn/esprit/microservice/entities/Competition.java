package tn.esprit.microservice.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data // Generates getters, setters, toString, equals, and hashCode
@NoArgsConstructor // Generates a no-args constructor
@AllArgsConstructor // Generates a constructor with all fields
@Entity
@Table(name = "competitions")
public class Competition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private LocalDateTime startDate;

    @Column(nullable = false)
    private LocalDateTime endDate;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String sportType;

    @Column(nullable = false)
    private Integer maxParticipants;

    @Column(nullable = false)
    private Double registrationFee;

    @Column(nullable = false)
    private String status; // PLANNED, ONGOING, COMPLETED, CANCELLED

    @Column(nullable = false)
    private String level; // BEGINNER, INTERMEDIATE, ADVANCED, PROFESSIONAL

    @Column(nullable = false)
    private String organizer;

    @Column(length = 1000)
    private String rules;

    @Column(length = 1000)
    private String prizes;

    @Column(nullable = false)
    private Boolean isPublic;

    @Column(nullable = false)
    private Integer currentParticipants = 0;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "competition", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<Participant> participants = new HashSet<>();

    @OneToMany(mappedBy = "competition", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<Result> results = new HashSet<>();

    @OneToMany(mappedBy = "competition", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<Schedule> schedules = new HashSet<>();

    // Helper methods
    public void addParticipant(Participant participant) {
        participants.add(participant);
        participant.setCompetition(this);
        currentParticipants++;
    }

    public void removeParticipant(Participant participant) {
        participants.remove(participant);
        participant.setCompetition(null);
        currentParticipants--;
    }

    public boolean isRegistrationOpen() {
        return LocalDateTime.now().isBefore(startDate) && 
               currentParticipants < maxParticipants && 
               status.equals("PLANNED");
    }

    public boolean isFull() {
        return currentParticipants >= maxParticipants;
    }
}
