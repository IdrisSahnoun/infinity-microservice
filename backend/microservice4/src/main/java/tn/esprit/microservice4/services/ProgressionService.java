package tn.esprit.microservice4.services;

import tn.esprit.microservice4.entities.Progression;

public interface ProgressionService {
    Progression demarrerPlan(int userId, int planId);
    void marquerSeanceTerminee(int progressionId);
    Progression obtenirProgression(int progressionId);
}