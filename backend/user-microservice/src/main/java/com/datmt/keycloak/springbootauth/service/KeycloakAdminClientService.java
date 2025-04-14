package com.datmt.keycloak.springbootauth.service;

import com.datmt.keycloak.springbootauth.config.KeycloakProvider;
import com.datmt.keycloak.springbootauth.http.requests.CreateUserRequest;
import com.datmt.keycloak.springbootauth.http.requests.User;
import com.datmt.keycloak.springbootauth.repository.UserRepository;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.admin.client.resource.RoleResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Collections;
import java.util.Arrays;

@Service
public class KeycloakAdminClientService {
    @Value("${keycloak.realm}")
    public String realm;

    private final KeycloakProvider kcProvider;
    private final UserRepository userRepository;

    public KeycloakAdminClientService(KeycloakProvider keycloakProvider, UserRepository userRepository) {
        this.kcProvider = keycloakProvider;
        this.userRepository = userRepository;
    }

    public Response createKeycloakUser(CreateUserRequest userRequest) {
        UsersResource usersResource = kcProvider.getInstance().realm(realm).users();
        CredentialRepresentation credentialRepresentation = createPasswordCredentials(userRequest.getPassword());

        UserRepresentation kcUser = new UserRepresentation();
        kcUser.setUsername(userRequest.getEmail());
        kcUser.setCredentials(Collections.singletonList(credentialRepresentation));
        kcUser.setFirstName(userRequest.getFirstname());
        kcUser.setLastName(userRequest.getLastname());
        kcUser.setEmail(userRequest.getEmail());
        kcUser.setEnabled(true);
        kcUser.setEmailVerified(false);

        Response response = usersResource.create(kcUser);

        if (response.getStatus() == 201) {
            // Extract the Keycloak user ID
            String userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
            // Assign default role (member)
            assignRoleToUser(userId, "member");
            // Save user to MySQL database
            User localUser = new User();
            localUser.setFirstName(kcUser.getFirstName());
            localUser.setLastName(kcUser.getLastName());
            localUser.setEmail(userRequest.getEmail());
            localUser.setUsername(userRequest.getEmail());
            localUser.setKeycloakId(userId);
            localUser.setCreatedDate(Timestamp.from(Instant.now()));
            localUser.setRole("member"); // Default role

            userRepository.save(localUser);
        }
        return response;
    }

    public void assignRoleToUser(String userId, String roleName) {
        RoleRepresentation roleRepresentation = kcProvider.getInstance().realm(realm)
                .roles().get(roleName).toRepresentation();

        kcProvider.getInstance().realm(realm).users().get(userId)
                .roles().realmLevel().add(Arrays.asList(roleRepresentation));
    }

    private static CredentialRepresentation createPasswordCredentials(String password) {
        CredentialRepresentation passwordCredentials = new CredentialRepresentation();
        passwordCredentials.setTemporary(false);
        passwordCredentials.setType(CredentialRepresentation.PASSWORD);
        passwordCredentials.setValue(password);
        return passwordCredentials;
    }
}