package it.engineering.web.jovicadjurisicbe.security;

import it.engineering.web.jovicadjurisicbe.model.entity.MyUser;
import it.engineering.web.jovicadjurisicbe.model.entity.Practitioner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class MyUserDetails extends org.springframework.security.core.userdetails.User implements UserDetails {

    @Autowired
    private MyUser myUser;

    public MyUserDetails(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }
}
