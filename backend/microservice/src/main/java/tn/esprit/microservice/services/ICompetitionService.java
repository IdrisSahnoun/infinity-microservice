package tn.esprit.microservice.services;

import tn.esprit.microservice.entities.Competition;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ICompetitionService {
    List<Competition> getAllCompetitions();
    Optional<Competition> getCompetitionById(Long id);
    Competition createCompetition(Competition competition);
    Competition updateCompetition(Long id, Competition competitionDetails);
    void deleteCompetition(Long id);
    List<Competition> searchCompetitions(String name, LocalDateTime startDate, LocalDateTime endDate, String location);
}
