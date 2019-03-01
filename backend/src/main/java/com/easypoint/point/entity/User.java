package com.easypoint.point.entity;

import com.easypoint.point.security.WebSecurityConfig;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.Collections;
import java.util.Objects;

import static org.apache.commons.lang3.StringUtils.isBlank;

/**
 * @author Maxuel Ramos
 */
@Entity
@Table(name = "`user`")
public class User implements UserDetails {

    @Id
    @GeneratedValue
    protected Integer id;

    @NotNull
    private String email;

    @NotNull
    private String name;

    @NotNull
    private String password;

    @NotNull
    @Column(length = 20)
    private String role;

    public User() {
    }

    public User(String name) {
        this.name = name;
    }

    //------------------------------
    //  Methods
    //------------------------------

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj instanceof User) {
            User other = (User) obj;
            return Objects.equals(id, other.id);
        }
        return false;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public void applyChanges(User user) {
        name = user.name;
        email = user.email;
        role = user.role;
        if(!isBlank(user.password)){
            password = user.password;
            updatePassword();
        }
    }

    public void updatePassword() {
//        if (isBlank(password)) {
//            // Only required for new users. If not, keep the previous password.
//            if (id == null) {
//                throw new IllegalArgumentException("The password is required.");
//            } else {
//                return;
//            }
//        }
//
//        if (password.length() < 6 || password.length() > 20) {
//            throw new IllegalArgumentException("The password must be between 6 and 20 characters.");
//        }
//
        this.password = WebSecurityConfig.passwordEncoder().encode(password);
    }

    //------------------------------
    //  UserDetails Implementation
    //------------------------------

    @Override
    @Transient
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(role));
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    @Transient
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @Transient
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @Transient
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }


    //------------------------------
    //  Getters & Setters
    //------------------------------

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
