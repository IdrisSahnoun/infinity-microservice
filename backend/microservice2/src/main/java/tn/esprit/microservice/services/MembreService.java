package tn.esprit.microservice.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.microservice.entities.Membre;
import tn.esprit.microservice.repositories.MembreRepo;


import java.util.List;
import java.util.Optional;

@Service
public class MembreService {

    @Autowired
    private MembreRepo membreRepository;

    // Create a new Membre
    public Membre createMembre(Membre membre) {
        return membreRepository.save(membre);
    }

    // Get all Membres
    public List<Membre> getAllMembres() {
        return membreRepository.findAll();
    }

    // Get a Membre by ID
    public Optional<Membre> getMembreById(int id) {
        return membreRepository.findById(id);
    }

    // Update a Membre
    public Membre updateMembre(int id, Membre membreDetails) {
        Optional<Membre> optionalMembre = membreRepository.findById(id);
        if (optionalMembre.isPresent()) {
            Membre existingMembre = optionalMembre.get();
            existingMembre.setFirstName(membreDetails.getFirstName());
            existingMembre.setLastName(membreDetails.getLastName());
            existingMembre.setAdresse(membreDetails.getAdresse());
            existingMembre.setCin(membreDetails.getCin());
            existingMembre.setPoids(membreDetails.getPoids());
            existingMembre.setTaille(membreDetails.getTaille());
            existingMembre.setSexe(membreDetails.getSexe());
            return membreRepository.save(existingMembre);
        } else {
            throw new RuntimeException("Membre not found with id: " + id);
        }
    }

    // Delete a Membre
    public void deleteMembre(int id) {
        membreRepository.deleteById(id);
    }
}