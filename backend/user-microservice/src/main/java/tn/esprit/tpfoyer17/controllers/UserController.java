package tn.esprit.tpfoyer17.controllers;


import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.keycloak.representations.AccessToken;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tn.esprit.tpfoyer17.entities.User;
@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<User> createUser(@RequestBody User user,
                                           KeycloakAuthenticationToken auth) {
        // Get Keycloak user info
        AccessToken token = auth.getAccount().getKeycloakSecurityContext().getToken();
        user.setKeycloakId(token.getSubject());
        user.setEmail(token.getEmail());

        // Save user to DB
        return ResponseEntity.ok(userService.createUser(user));
    }

    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}