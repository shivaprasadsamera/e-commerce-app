package com.ecommerce.backend.configuration;

import com.ecommerce.backend.service.JwtService;
import com.ecommerce.backend.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    public static  String CURRENT_USER = "";

    private final JwtUtil jwtUtil;
    private final JwtService jwtService;

    @Autowired
    public JwtRequestFilter(JwtUtil jwtUtil,  @Lazy JwtService jwtService) {
        this.jwtUtil = jwtUtil;
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {

        final String requestTokenHeader = httpServletRequest.getHeader("Authorization");

        String userName = null;
        String jwtToken = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                userName = jwtUtil.getUsernameFromToken(jwtToken);
                CURRENT_USER = userName;
            } catch (IllegalArgumentException e) {
                System.out.println("Unable to get JWT Token" + e.getMessage());
            } catch (ExpiredJwtException e) {
                System.out.println("JWT Token has expired" + e.getMessage());
            }
        } else {
            if (requestTokenHeader == null) {
                System.out.println("Authorization header is missing");
            } else {
                System.out.println("JWT token does not start with Bearer");
            }
        }

        if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = jwtService.loadUserByUsername(userName);

            if (jwtUtil.validateToken(jwtToken, userDetails)) {

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));

                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }

        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);

    }


}
