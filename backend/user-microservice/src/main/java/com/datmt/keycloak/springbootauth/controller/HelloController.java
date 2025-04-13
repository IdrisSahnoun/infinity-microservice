package com.datmt.keycloak.springbootauth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping("/auth")

public class HelloController {

	@GetMapping("/public/hello")
	public ResponseEntity<String> helloPublic() {
		return ResponseEntity.ok("Hello public user");
	}

	@GetMapping("/member/hello")
	public ResponseEntity<String> helloMember() {
		return ResponseEntity.ok("Hello dear member");
	}

	@GetMapping("/admin/hello")
	public ResponseEntity<String> helloAdmin() {
		return ResponseEntity.ok("Nice day, admin");
	}

	@RolesAllowed("member")
	@GetMapping("/public/hello-fake-public")
	public ResponseEntity<String> helloCustom() {
		return ResponseEntity.ok("Nice day, it appears to be public but not");
	}
}