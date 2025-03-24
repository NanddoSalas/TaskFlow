package com.taskflow.server.filters;

import com.taskflow.server.entities.User;
import com.taskflow.server.services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@AllArgsConstructor
public class CustomPrincipalFilter extends OncePerRequestFilter {

    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        SecurityContext context = SecurityContextHolder.getContext();

        Authentication authentication = context.getAuthentication();

        if (authentication.getPrincipal() instanceof Jwt jwt) {
            String sub = jwt.getSubject();
            String name = jwt.getClaimAsString("name");
            String email = jwt.getClaimAsString("email");
            String picture = jwt.getClaimAsString("picture");

            if (picture == null) {
                picture = "";
            }

            User user = userService.loadOrCrateUser(sub, name, email, picture);

            SecurityContext newContext = SecurityContextHolder.createEmptyContext();
            Authentication newAuthentication = new TestingAuthenticationToken(user, "", "ROLE_USER");
            newContext.setAuthentication(newAuthentication);

            SecurityContextHolder.setContext(newContext);
        }

        filterChain.doFilter(request, response);
    }
}
