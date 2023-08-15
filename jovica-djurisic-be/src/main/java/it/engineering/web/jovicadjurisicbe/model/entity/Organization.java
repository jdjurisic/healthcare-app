package it.engineering.web.jovicadjurisicbe.model.entity;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.engineering.web.jovicadjurisicbe.model.enums.OrganizationType;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.Objects;

@Entity
@Table(name = "organizations")
@SQLDelete(sql = "UPDATE organizations SET active = 0 WHERE id = ?")
public class Organization {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(unique = true)
	@NotBlank
	@Size(min = 5)
	private String name;
	
	@NotNull
	private Boolean active;
	
	@NotNull
	@Enumerated(EnumType.STRING)
	private OrganizationType type;
	
	@Email
	private String email;
	
	private String address;
	private String phone;

	@Size(min = 5)
	@Column(unique = true)
	private String identifier;

	public Organization() {
	}

	public Organization(Long id, String name, Boolean active, OrganizationType type, String email, String address, String phone, String identifier) {
		this.id = id;
		this.name = name;
		this.active = active;
		this.type = type;
		this.email = email;
		this.address = address;
		this.phone = phone;
		this.identifier = identifier;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIdentifier() {
		return identifier;
	}

	public void setIdentifier(String identifier) {
		this.identifier = identifier;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public OrganizationType getType() {
		return type;
	}

	public void setType(OrganizationType type) {
		this.type = type;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Organization that = (Organization) o;
		return Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(active, that.active) && type == that.type && Objects.equals(email, that.email) && Objects.equals(address, that.address) && Objects.equals(phone, that.phone) && Objects.equals(identifier, that.identifier);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, active, type, email, address, phone, identifier);
	}

	@Override
	public String toString() {
		return "Organization{" +
				"id=" + id +
				", name='" + name + '\'' +
				", active=" + active +
				", type=" + type +
				", email='" + email + '\'' +
				", address='" + address + '\'' +
				", phone='" + phone + '\'' +
				", identifier='" + identifier + '\'' +
				'}';
	}
}
