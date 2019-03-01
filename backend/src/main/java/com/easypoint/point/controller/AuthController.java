package com.easypoint.point.controller;

import com.easypoint.point.entity.User;
import com.easypoint.point.security.JwtAuthenticationRequest;
import com.easypoint.point.security.JwtAuthenticationResponse;
import com.easypoint.point.security.JwtTokenUtil;
import com.easypoint.point.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    private final AuthService authService;

    @Value("Authorization")
    private String tokenHeader;
    private AuthenticationManager authenticationManager;
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    public AuthController(AuthService authService, JwtTokenUtil jwtTokenUtil, AuthenticationManager authenticationManager) {
        this.authService = authService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.authenticationManager = authenticationManager;
    }

    /*
     *  GET /api/auth
     */
    @RequestMapping(method = GET)
    public ResponseEntity<User> authenticated(HttpServletRequest request) throws Exception {
        String token = request.getHeader(tokenHeader);
        Integer id = jwtTokenUtil.getIdFromToken(token);

        // token expirado
        if(id == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

        User user = authService.getById(id);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        } else {
            return ResponseEntity.ok(user);
        }
    }

    /*
     *  PUT /api/auth
     */
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest) throws AuthenticationException {

        // Perform the security
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Reload password post-security so we can generate token
        final User user = authService.loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(user);

        // Return the token
        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
    }

    /*
     *  GET /api/auth/refresh
     */
    @RequestMapping(value = "refresh", method = RequestMethod.GET)
    public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
        String token = request.getHeader(tokenHeader);

        if (jwtTokenUtil.canTokenBeRefreshed(token)) {
            String refreshedToken = jwtTokenUtil.refreshToken(token);
            return ResponseEntity.ok(new JwtAuthenticationResponse(refreshedToken));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}
