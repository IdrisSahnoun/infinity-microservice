package tn.esprit.microservice1.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.microservice1.entities.SalleDeSport;
import tn.esprit.microservice1.entities.Sport;
import tn.esprit.microservice1.repositories.SalleDeSportRepository;
import tn.esprit.microservice1.repositories.SportRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class StatistiqueService {

    @Autowired
    private SalleDeSportRepository salleDeSportRepository;

    @Autowired
    private SportRepository sportRepository;

    // Statistiques des salles de sport
    public Map<String, Object> getStatistiquesSalles() {
        List<SalleDeSport> salles = salleDeSportRepository.findAll();
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("nombreTotalSalles", salles.size());
        stats.put("moyenneCapacite", salles.stream()
                .mapToInt(SalleDeSport::getCapacite)
                .average()
                .orElse(0));
        stats.put("moyennePrixAbonnement", salles.stream()
                .mapToDouble(SalleDeSport::getPrixMoyenAbonnement)
                .average()
                .orElse(0));
        
        // Top 5 des sports les plus populaires
        Map<Sport, Long> sportsCount = salles.stream()
                .flatMap(salle -> salle.getSports().stream())
                .collect(Collectors.groupingBy(sport -> sport, Collectors.counting()));
        
        List<Map<String, Object>> topSports = sportsCount.entrySet().stream()
                .sorted(Map.Entry.<Sport, Long>comparingByValue().reversed())
                .limit(5)
                .map(entry -> {
                    Map<String, Object> sportInfo = new HashMap<>();
                    sportInfo.put("nom", entry.getKey().getNom());
                    sportInfo.put("nombreSalles", entry.getValue());
                    return sportInfo;
                })
                .collect(Collectors.toList());
        
        stats.put("topSports", topSports);
        return stats;
    }

    // Recommandations de salles basées sur les préférences
    public List<SalleDeSport> getRecommandationsSalles(String ville, Double prixMax, Set<String> sportsPreferes) {
        return salleDeSportRepository.findAll().stream()
                .filter(salle -> salle.getVille().equalsIgnoreCase(ville))
                .filter(salle -> salle.getPrixMoyenAbonnement() <= prixMax)
                .filter(salle -> salle.getSports().stream()
                        .anyMatch(sport -> sportsPreferes.contains(sport.getNom())))
                .sorted(Comparator.comparing(SalleDeSport::getPrixMoyenAbonnement))
                .collect(Collectors.toList());
    }

    // Analyse des tendances des sports par ville
    public Map<String, List<Map<String, Object>>> getTendancesParVille() {
        List<SalleDeSport> salles = salleDeSportRepository.findAll();
        
        return salles.stream()
                .collect(Collectors.groupingBy(SalleDeSport::getVille))
                .entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> {
                            List<SalleDeSport> sallesVille = entry.getValue();
                            return sallesVille.stream()
                                    .flatMap(salle -> salle.getSports().stream())
                                    .collect(Collectors.groupingBy(Sport::getNom, Collectors.counting()))
                                    .entrySet().stream()
                                    .map(sportEntry -> {
                                        Map<String, Object> sportInfo = new HashMap<>();
                                        sportInfo.put("nom", sportEntry.getKey());
                                        sportInfo.put("nombreSalles", sportEntry.getValue());
                                        return sportInfo;
                                    })
                                    .sorted(Comparator.comparing(m -> (Long) m.get("nombreSalles"), Comparator.reverseOrder()))
                                    .collect(Collectors.toList());
                        }
                ));
    }
} 