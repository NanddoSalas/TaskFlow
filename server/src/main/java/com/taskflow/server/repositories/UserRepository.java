package com.taskflow.server.repositories;

import com.taskflow.server.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {

    Optional<User> findByGoogleId(String googleId);

}
