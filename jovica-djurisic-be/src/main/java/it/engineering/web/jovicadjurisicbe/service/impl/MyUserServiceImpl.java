package it.engineering.web.jovicadjurisicbe.service.impl;

import it.engineering.web.jovicadjurisicbe.model.entity.MyUser;
import it.engineering.web.jovicadjurisicbe.repository.MyUserRepository;
import it.engineering.web.jovicadjurisicbe.service.MyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserServiceImpl implements MyUserService {
    @Autowired
    MyUserRepository myUserRepository;

    @Override
    public MyUser save(MyUser user) {
        return myUserRepository.save(user);
    }

    @Override
    public MyUser update(MyUser user) {
        return myUserRepository.save(user);
    }

    @Override
    public void deleteById(Long id) {
        myUserRepository.deleteById(id);
    }

    @Override
    public Optional<MyUser> findById(Long id) {
        return myUserRepository.findById(id);
    }

    @Override
    public Optional<MyUser> findByUsername(String username) {
        return myUserRepository.findByUsername(username);
    }
}
