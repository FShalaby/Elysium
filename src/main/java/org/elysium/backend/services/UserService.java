package org.elysium.backend.services;

import org.elysium.backend.models.User;
import org.elysium.backend.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User register(User user) {
        // Check if the user already exists by email
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("User already exists");
        }

        // Generate a random ID if it's not set
        if (user.getId() == null || user.getId().isEmpty()) {
            user.setId(user.generateRandomId());
        }

        // Save the user with the plain password
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("Invalid credentials");
        }

        User user = userOptional.get();

        // Log the passwords for debugging
        System.out.println("Stored password: " + user.getPassword());
        System.out.println("Provided password: " + password);

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid credentials");
        }
        return user;
    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }
}