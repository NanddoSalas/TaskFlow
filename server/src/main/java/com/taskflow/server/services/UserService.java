package com.taskflow.server.services;

import com.taskflow.server.entities.User;
import com.taskflow.server.repositories.UserRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
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

            populateDefaultData(user.getId());

            return user;
        }
    }

    @Transactional
    public void populateDefaultData(int userId) {
        entityManager.createNativeQuery("CALL populate_new_user(:userId)")
                .setParameter("userId", userId)
                .executeUpdate();
    }

}
