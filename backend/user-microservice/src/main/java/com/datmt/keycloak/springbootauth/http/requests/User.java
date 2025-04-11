package com.datmt.keycloak.springbootauth.http.requests;


import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String firstName;
    private String lastName;
    private String email;
    private String username;

    @Column(unique = true)
    private String keycloakId;

    private Timestamp createdDate;
    private String role;

    // Constructors, getters, setters are handled by Lombok @Data
}