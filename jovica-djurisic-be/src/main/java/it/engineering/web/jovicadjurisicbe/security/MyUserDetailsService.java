package it.engineering.web.jovicadjurisicbe.security;

import it.engineering.web.jovicadjurisicbe.model.entity.MyUser;
import it.engineering.web.jovicadjurisicbe.repository.MyUserRepository;
import it.engineering.web.jovicadjurisicbe.service.MyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private MyUserService myUserService;

    @Override
    public MyUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<MyUser> user = myUserService.findByUsername(username);
        if(!user.isPresent()) throw new UsernameNotFoundException("Username:" + username + " not found.");

        MyUserDetails myUserDetails = new MyUserDetails(user.get().getUsername(), user.get().getPassword(), getGrantedAuthorities(user.get()));
        return myUserDetails;
    }

    private Collection<GrantedAuthority> getGrantedAuthorities(MyUser user) {
        Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return grantedAuthorities;
    }
}
