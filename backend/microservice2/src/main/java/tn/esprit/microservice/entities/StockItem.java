package tn.esprit.microservice.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class StockItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String itemCode;

    private String itemName;
    private String description;
    private int quantity;
    private double price;
    private int reorderThreshold;
    private String supplierInfo;
}