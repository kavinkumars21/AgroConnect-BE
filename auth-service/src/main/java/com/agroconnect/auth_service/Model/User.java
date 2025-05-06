package com.agroconnect.auth_service.Model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor

@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String userName;
    private String password;

    private String email;
    private String phoneNumber;

    private boolean isExpired = false;

    private boolean isLocked = false;

    private boolean isCredentialsExpired = false;

    private boolean isEnabled = true;

    private Set<String> roles = new HashSet<>();

    public User(String userName, String password, String email, String phoneNumber, Set<String> roles) {
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.roles = roles;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return isExpired == user.isExpired && isLocked == user.isLocked &&
                isCredentialsExpired == user.isCredentialsExpired &&
                isEnabled == user.isEnabled &&
                Objects.equals(id, user.id) &&
                Objects.equals(userName, user.userName) &&
                Objects.equals(password, user.password) &&
                Objects.equals(email, user.email) &&
                Objects.equals(phoneNumber, user.phoneNumber) &&
                Objects.equals(roles, user.roles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userName, password, email, phoneNumber, isExpired, isLocked, isCredentialsExpired, isEnabled, roles);
    }
}
