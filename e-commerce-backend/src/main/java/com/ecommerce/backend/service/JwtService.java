 package com.ecommerce.backend.service;

 import com.ecommerce.backend.dao.UserDao;
 import com.ecommerce.backend.entity.JwtRequest;
 import com.ecommerce.backend.entity.JwtResponse;
 import com.ecommerce.backend.entity.User;
 import com.ecommerce.backend.util.JwtUtil;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.security.authentication.AuthenticationManager;
 import org.springframework.security.authentication.BadCredentialsException;
 import org.springframework.security.authentication.DisabledException;
 import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
 import org.springframework.security.core.authority.SimpleGrantedAuthority;
 import org.springframework.security.core.userdetails.UserDetails;
 import org.springframework.security.core.userdetails.UserDetailsService;
 import org.springframework.security.core.userdetails.UsernameNotFoundException;
 import org.springframework.stereotype.Service;

 import java.util.HashSet;
 import java.util.Optional;
 import java.util.Set;

 @Service
 public class JwtService implements UserDetailsService {


     private final UserDao userDao;
     private final JwtUtil jwtUtil;
     private final AuthenticationManager authenticationManager;

     @Autowired
     public JwtService(UserDao userDao, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
         this.userDao = userDao;
         this.jwtUtil = jwtUtil;
         this.authenticationManager = authenticationManager;
     }

     public JwtResponse createJwtToken(JwtRequest jwtRequest) throws Exception {
         String userName = jwtRequest.getUserName();
         String userPassword = jwtRequest.getUserPassword();
         authenticate(userName, userPassword);

         final UserDetails userDetails = loadUserByUsername(userName);

         String newGeneratedToken = jwtUtil.generateToken(userDetails);

//         User user = userDao.findById(userName).get();
         Optional<User> userOptional = userDao.findById(userName);
         if (userOptional.isPresent()) {
             User user = userOptional.get();
             return new JwtResponse(user, newGeneratedToken);
         } else {
             throw new UsernameNotFoundException("User not found with username: " + userName);
         }
//         return new JwtResponse(user, newGeneratedToken);
     }

     @Override
     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//         User user = userDao.findById(username).get();
         Optional<User> userOptional = userDao.findById(username);

         if (userOptional.isPresent()) {
             User user = userOptional.get();
             return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getUserPassword(), getAuthorities(user));
         } else {
             throw new UsernameNotFoundException("Username not found: " + username);
         }

     }

     private Set<SimpleGrantedAuthority> getAuthorities(User user) {
         Set<SimpleGrantedAuthority> authorities = new HashSet<>();
         user.getRole().forEach(role -> {
             authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRoleName()));
         });
         return authorities;
     }



     private void authenticate(String userName, String userPassword) throws Exception {

         try {
             authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, userPassword));
         } catch (DisabledException e) {
             throw new Exception("User disabled!");
         } catch (BadCredentialsException e) {
             throw new Exception("Bad Credentials!");
         }

     }
 }



