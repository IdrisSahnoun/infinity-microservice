package tn.esprit.microservice.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import tn.esprit.microservice.entities.Competition;
import tn.esprit.microservice.repositories.CompetitionRepository;
import tn.esprit.microservice.specifications.CompetitionSpecification;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor // Generates a constructor with all final fields
public class CompetitionService implements ICompetitionService {

    private final CompetitionRepository competitionRepository;

    // Get all competitions
    public List<Competition> getAllCompetitions() {
        return competitionRepository.findAll();
    }

    // Get a competition by ID
    public Optional<Competition> getCompetitionById(Long id) {
        return competitionRepository.findById(id);
    }

    // Create a new competition
    public Competition createCompetition(Competition competition) {
        return competitionRepository.save(competition);
    }

    // Update an existing competition
    public Competition updateCompetition(Long id, Competition competitionDetails) {
        Competition competition = competitionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Competition not found with id: " + id));

        competition.setName(competitionDetails.getName());
        competition.setDescription(competitionDetails.getDescription());
        competition.setStartDate(competitionDetails.getStartDate());
        competition.setEndDate(competitionDetails.getEndDate());
        competition.setLocation(competitionDetails.getLocation());

        return competitionRepository.save(competition);
    }

    // Delete a competition
    public void deleteCompetition(Long id) {
        competitionRepository.deleteById(id);
    }
    public List<Competition> searchCompetitions(String name, LocalDateTime startDate, LocalDateTime endDate, String location) {
        Specification<Competition> spec = Specification.where(CompetitionSpecification.hasName(name))
                .and(CompetitionSpecification.isInDateRange(startDate, endDate))
                .and(CompetitionSpecification.hasLocation(location));
        return competitionRepository.findAll(spec);
    }
}
