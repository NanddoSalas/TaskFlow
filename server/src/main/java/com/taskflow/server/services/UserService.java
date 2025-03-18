package com.taskflow.server.services;

import com.taskflow.server.entities.User;
import com.taskflow.server.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User loadOrCrateUser(String googleId, String name, String email, String picture) {
        Optional<User> userOptional = userRepository.findByGoogleId(googleId);

        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            User user = new User();

            user.setGoogleId(googleId);
            user.setName(name);
            user.setEmail(email);
            user.setPicture(picture);

            userRepository.save(user);

            return user;
        }
    }

}
