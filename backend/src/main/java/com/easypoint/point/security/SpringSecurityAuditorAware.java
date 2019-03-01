package com.easypoint.point.security;

import com.easypoint.point.entity.User;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

/**
 * Classe utilizada pelo Spring Data JPA para obter o usuário da autenticação, que será utilizado para preencher
 * automaticamente as proprieades anotadas com {@code @CreatedBy} e {@code @LastModifiedBy} dentros das entidades
 * do sistema.
 */
public class SpringSecurityAuditorAware implements AuditorAware<User> {

    @Override
    public Optional<User> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        return Optional.ofNullable((User) authentication.getPrincipal());
    }
}
