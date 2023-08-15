package it.engineering.web.jovicadjurisicbe.repository;

import it.engineering.web.jovicadjurisicbe.model.entity.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MyUserRepository extends JpaRepository<MyUser, Long> {
    Optional<MyUser> findByUsername(String username);
    }