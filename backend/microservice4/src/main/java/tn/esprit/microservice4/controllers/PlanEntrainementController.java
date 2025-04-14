package tn.esprit.microservice4.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;
import tn.esprit.microservice4.entities.PlanEntrainement;
import tn.esprit.microservice4.services.PlanEntrainementService;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class PlanEntrainementController {

    @Autowired
    private PlanEntrainementService planEntrainementService;

    @PostMapping("/add")
    public ResponseEntity<?> addPlan(@Valid @RequestBody PlanEntrainement plan, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        return ResponseEntity.ok(planEntrainementService.savePlanEntrainement(plan));
    }

    @GetMapping("/list")
    public List<PlanEntrainement> getAllPlans() {
        return planEntrainementService.getAllPlans();
    }

    @GetMapping("/list/actifs")
    public List<PlanEntrainement> getPlansActifs() {
        return planEntrainementService.getAllPlans().stream()
                .filter(PlanEntrainement::isActif)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Optional<PlanEntrainement> getPlanById(@PathVariable int id) {
        return planEntrainementService.getPlanById(id);
    }

    @PutMapping("/update/{id}")
    public PlanEntrainement updatePlan(@PathVariable int id, @RequestBody PlanEntrainement updatedPlan) {
        return planEntrainementService.updatePlanEntrainement(id, updatedPlan);
    }

    @DeleteMapping("/delete/{id}")
    public void deletePlan(@PathVariable int id) {
        planEntrainementService.deletePlanEntrainement(id);
    }

    @PutMapping("/toggle/{id}")
    public ResponseEntity<?> toggleActif(@PathVariable int id) {
        Optional<PlanEntrainement> planOpt = planEntrainementService.getPlanById(id);
        if (planOpt.isPresent()) {
            PlanEntrainement plan = planOpt.get();
            plan.setActif(!plan.isActif());
            return ResponseEntity.ok(planEntrainementService.savePlanEntrainement(plan));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public List<PlanEntrainement> searchPlans(@RequestParam String keyword) {
        return planEntrainementService.getAllPlans().stream()
                .filter(p -> p.getTitre().toLowerCase().contains(keyword.toLowerCase()) ||
                        p.getDescription().toLowerCase().contains(keyword.toLowerCase()))
                .collect(Collectors.toList());
    }

    @GetMapping("/filter")
    public List<PlanEntrainement> filterByDuree(@RequestParam(required = false) Integer min,
                                                @RequestParam(required = false) Integer max) {
        return planEntrainementService.getAllPlans().stream()
                .filter(p -> (min == null || p.getDuree() >= min) &&
                        (max == null || p.getDuree() <= max))
                .collect(Collectors.toList());
    }

    @GetMapping("/sorted")
    public List<PlanEntrainement> sortPlans(@RequestParam(defaultValue = "titre") String sortBy) {
        return switch (sortBy.toLowerCase()) {
            case "duree" -> planEntrainementService.getAllPlans().stream()
                    .sorted(Comparator.comparingInt(PlanEntrainement::getDuree))
                    .collect(Collectors.toList());
            case "titre" -> planEntrainementService.getAllPlans().stream()
                    .sorted(Comparator.comparing(PlanEntrainement::getTitre))
                    .collect(Collectors.toList());
            default -> planEntrainementService.getAllPlans();
        };
    }

    @GetMapping("/paginated")
    public List<PlanEntrainement> getPaginatedPlans(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "5") int size) {
        List<PlanEntrainement> allPlans = planEntrainementService.getAllPlans();
        int start = page * size;
        int end = Math.min(start + size, allPlans.size());
        return (start >= allPlans.size()) ? List.of() : allPlans.subList(start, end);
    }

    @GetMapping("/export/json")
    public List<PlanEntrainement> exportJson() {
        return planEntrainementService.getAllPlans();
    }

    @GetMapping(value = "/export/csv", produces = "text/csv")
    public String exportCsv() {
        StringBuilder sb = new StringBuilder("ID,Titre,Description,Durée\n");
        for (PlanEntrainement p : planEntrainementService.getAllPlans()) {
            sb.append(p.getId()).append(",")
                    .append(p.getTitre()).append(",")
                    .append(p.getDescription()).append(",")
                    .append(p.getDuree()).append("\n");
        }
        return sb.toString();
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        List<PlanEntrainement> plans = planEntrainementService.getAllPlans();
        int total = plans.size();
        double moyenne = plans.stream().mapToInt(PlanEntrainement::getDuree).average().orElse(0);
        int min = plans.stream().mapToInt(PlanEntrainement::getDuree).min().orElse(0);
        int max = plans.stream().mapToInt(PlanEntrainement::getDuree).max().orElse(0);

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalPlans", total);
        stats.put("dureeMoyenne", moyenne);
        stats.put("dureeMin", min);
        stats.put("dureeMax", max);

        return stats;
    }

    @GetMapping("/suggest/{id}")
    public List<PlanEntrainement> suggestSimilar(@PathVariable int id) {
        Optional<PlanEntrainement> ref = planEntrainementService.getPlanById(id);
        if (ref.isEmpty()) return List.of();
        String keyword = ref.get().getTitre().split(" ")[0].toLowerCase();
        return planEntrainementService.getAllPlans().stream()
                .filter(p -> p.getId() != id &&
                        p.getTitre().toLowerCase().contains(keyword))
                .limit(5)
                .collect(Collectors.toList());
    }

    @GetMapping("/recent")
    public List<PlanEntrainement> getRecentlyUpdatedPlans() {
        return planEntrainementService.getAllPlans().stream()
                .sorted(Comparator.comparing(PlanEntrainement::getLastModified).reversed())
                .limit(5)
                .collect(Collectors.toList());
    }

    @GetMapping("/test")
    public String test() {
        return "Plan d'entraînement API is working!";
    }
}
