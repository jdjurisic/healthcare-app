package it.engineering.web.jovicadjurisicbe.service;

import it.engineering.web.jovicadjurisicbe.model.entity.MyUser;
import it.engineering.web.jovicadjurisicbe.model.entity.Organization;

import java.util.Optional;

public interface MyUserService {
    MyUser save(MyUser organization);
    MyUser update(MyUser organization);
    void deleteById(Long id);
    Optional<MyUser> findById(Long id);
    Optional<MyUser> findByUsername(String username);
}
