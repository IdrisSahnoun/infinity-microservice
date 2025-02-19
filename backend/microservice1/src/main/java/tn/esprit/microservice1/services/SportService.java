package tn.esprit.microservice1.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.microservice1.entities.Sport;
import tn.esprit.microservice1.entities.SalleDeSport;
import tn.esprit.microservice1.repositories.SportRepository;
import tn.esprit.microservice1.repositories.SalleDeSportRepository;

import java.util.List;
import java.util.Set;

@Service
public class SportService {
    
    private final SportRepository sportRepository;
    private final SalleDeSportRepository salleDeSportRepository;
    
    @Autowired
    public SportService(SportRepository sportRepository, SalleDeSportRepository salleDeSportRepository) {
        this.sportRepository = sportRepository;
        this.salleDeSportRepository = salleDeSportRepository;
    }
    
    public List<Sport> getAllSports() {
        return sportRepository.findAll();
    }
    
    public Sport getSportById(Integer id) {
        return sportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sport not found with id: " + id));
    }
    
    public Sport createSport(Sport sport) {
        return sportRepository.save(sport);
    }
    
    public Sport updateSport(Integer id, Sport sport) {
        if (!sportRepository.existsById(id)) {
            throw new RuntimeException("Sport not found with id: " + id);
        }
        sport.setCodeSport(id);
        return sportRepository.save(sport);
    }
    
    public void deleteSport(Integer id) {
        if (!sportRepository.existsById(id)) {
            throw new RuntimeException("Sport not found with id: " + id);
        }
        sportRepository.deleteById(id);
    }
    
    // Relationship management methods
    public void assignSportToSalle(Integer sportId, Integer salleId) {
        Sport sport = getSportById(sportId);
        SalleDeSport salle = salleDeSportRepository.findById(salleId)
                .orElseThrow(() -> new RuntimeException("Salle not found with id: " + salleId));
        
        salle.addSport(sport);
        salleDeSportRepository.save(salle);
    }
    
    public void removeSportFromSalle(Integer sportId, Integer salleId) {
        Sport sport = getSportById(sportId);
        SalleDeSport salle = salleDeSportRepository.findById(salleId)
                .orElseThrow(() -> new RuntimeException("Salle not found with id: " + salleId));
        
        salle.removeSport(sport);
        salleDeSportRepository.save(salle);
    }
    
    public Set<SalleDeSport> getSallesBySportId(Integer sportId) {
        Sport sport = getSportById(sportId);
        return sport.getSalles();
    }
} 