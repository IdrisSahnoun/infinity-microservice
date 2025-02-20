package tn.esprit.microservice1.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.microservice1.entities.SalleDeSport;
import tn.esprit.microservice1.repositories.SalleDeSportRepository;

import java.util.List;

@Service
public class SalleDeSportService {
    
    private final SalleDeSportRepository salleDeSportRepository;
    
    @Autowired
    public SalleDeSportService(SalleDeSportRepository salleDeSportRepository) {
        this.salleDeSportRepository = salleDeSportRepository;
    }
    
    public List<SalleDeSport> getAllSalles() {
        return salleDeSportRepository.findAll();
    }
    
    public SalleDeSport getSalleById(Integer id) {
        return salleDeSportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salle not found with id: " + id));
    }
    
    public SalleDeSport createSalle(SalleDeSport salle) {
        return salleDeSportRepository.save(salle);
    }
    
    public SalleDeSport updateSalle(Integer id, SalleDeSport salle) {
        if (!salleDeSportRepository.existsById(id)) {
            throw new RuntimeException("Salle not found with id: " + id);
        }
        salle.setId(id);
        return salleDeSportRepository.save(salle);
    }
    
    public void deleteSalle(Integer id) {
        if (!salleDeSportRepository.existsById(id)) {
            throw new RuntimeException("Salle not found with id: " + id);
        }
        salleDeSportRepository.deleteById(id);
    }
} 