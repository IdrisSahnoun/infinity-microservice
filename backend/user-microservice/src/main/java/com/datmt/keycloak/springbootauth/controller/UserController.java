package com.datmt.keycloak.springbootauth.controller;


import com.datmt.keycloak.springbootauth.config.KeycloakProvider;
import com.datmt.keycloak.springbootauth.http.requests.CreateUserRequest;
import com.datmt.keycloak.springbootauth.http.requests.LoginRequest;
import com.datmt.keycloak.springbootauth.http.requests.User;
import com.datmt.keycloak.springbootauth.repository.UserRepository;
import com.datmt.keycloak.springbootauth.service.KeycloakAdminClientService;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.core.Response;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class UserController {

    // Add this field to your controller
    @Value("${keycloak.realm}")
    private String realm;


    private final KeycloakAdminClientService kcAdminClient;

    private final KeycloakProvider kcProvider;
    private final UserRepository userRepository;

    private static final Logger LOG = org.slf4j.LoggerFactory.getLogger(UserController.class);


    public UserController(KeycloakAdminClientService kcAdminClient, KeycloakProvider kcProvider, UserRepository userRepository) {
        this.kcProvider = kcProvider;
        this.kcAdminClient = kcAdminClient;
        this.userRepository = userRepository;
    }


    @PostMapping(value = "/create")
    public ResponseEntity<?> createUser(@RequestBody CreateUserRequest user, @RequestParam(defaultValue = "member") String role) {
        Response createdResponse = kcAdminClient.createKeycloakUser(user);

        if (createdResponse.getStatus() == 201) {
            String userId = createdResponse.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");

            // Assign the specified role (either "admin" or "member")
            if (role.equals("admin") || role.equals("member")) {
                kcAdminClient.assignRoleToUser(userId, role);
            }
        }

        return ResponseEntity.status(createdResponse.getStatus()).build();
    }

    @PostMapping("/login")
    public ResponseEntity<AccessTokenResponse> login(@NotNull @RequestBody LoginRequest loginRequest) {
        Keycloak keycloak = kcProvider.newKeycloakBuilderWithPasswordCredentials(loginRequest.getUsername(), loginRequest.getPassword()).build();

        AccessTokenResponse accessTokenResponse = null;
        try {
            accessTokenResponse = keycloak.tokenManager().getAccessToken();

            // Authentication successful - now check/update database

            // 1. Get the Keycloak user ID from the token
            org.keycloak.representations.AccessToken token =
                    org.keycloak.TokenVerifier.create(accessTokenResponse.getToken(), org.keycloak.representations.AccessToken.class).getToken();
            String keycloakUserId = token.getSubject();
            String email = token.getEmail();

            // 2. Find the user in the database by Keycloak ID
            Optional<User> userOptional = userRepository.findByKeycloakId(keycloakUserId);
            User user;

            if (userOptional.isPresent()) {
                // User exists - update last login time if needed
                user = userOptional.get();
                // You could add a lastLoginDate field to track this
                // user.setLastLoginDate(Timestamp.from(Instant.now()));
            } else {
                // This is a user that exists in Keycloak but not in our DB
                // This might happen if you imported users to Keycloak directly
                user = new User();
                user.setKeycloakId(keycloakUserId);
                user.setEmail(email);
                user.setUsername(loginRequest.getUsername());
                user.setCreatedDate(Timestamp.from(Instant.now()));

                // Get user details from Keycloak
                UserRepresentation userRepresentation = kcProvider.getInstance().realm(realm)
                        .users().get(keycloakUserId).toRepresentation();

                user.setFirstName(userRepresentation.getFirstName());
                user.setLastName(userRepresentation.getLastName());

                // Get user's role from Keycloak
                List<RoleRepresentation> roles = kcProvider.getInstance().realm(realm)
                        .users().get(keycloakUserId).roles().realmLevel().listAll();

                // Assuming roles are not empty and first one is what we want
                if (!roles.isEmpty()) {
                    user.setRole(roles.get(0).getName());
                } else {
                    user.setRole("member"); // Default role
                }
            }

            // Save/update the user in the database
            userRepository.save(user);

            return ResponseEntity.status(HttpStatus.OK).body(accessTokenResponse);
        } catch (BadRequestException ex) {
            LOG.warn("Invalid account. User probably hasn't verified email.", ex);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(accessTokenResponse);
        } catch (Exception ex) {
            LOG.error("Error during login process", ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

	

}
