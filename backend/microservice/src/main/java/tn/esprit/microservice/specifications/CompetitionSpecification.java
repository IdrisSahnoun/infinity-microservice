package tn.esprit.microservice.specifications;

import org.springframework.data.jpa.domain.Specification;
import tn.esprit.microservice.entities.Competition;

import java.time.LocalDateTime;

public class CompetitionSpecification {

    public static Specification<Competition> hasName(String name) {
        return (root, query, criteriaBuilder) ->
                name == null ? null : criteriaBuilder.like(root.get("name"), "%" + name + "%");
    }

    public static Specification<Competition> isInDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return (root, query, criteriaBuilder) -> {
            if (startDate == null && endDate == null) {
                return null;
            } else if (startDate != null && endDate != null) {
                return criteriaBuilder.between(root.get("startDate"), startDate, endDate);
            } else if (startDate != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("startDate"), startDate);
            } else {
                return criteriaBuilder.lessThanOrEqualTo(root.get("endDate"), endDate);
            }
        };
    }

    public static Specification<Competition> hasLocation(String location) {
        return (root, query, criteriaBuilder) ->
                location == null ? null : criteriaBuilder.equal(root.get("location"), location);
    }
}
