package it.engineering.web.jovicadjurisicbe.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import it.engineering.web.jovicadjurisicbe.model.enums.Gender;
import it.engineering.web.jovicadjurisicbe.model.enums.MaritalStatus;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "patients")
@SQLDelete(sql = "UPDATE patients SET active = 0 where id = ?")
//@Where(clause = "active=1")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Boolean active;

    @NotBlank
    @Size(min = 3)
    private String name;

    @NotBlank
    @Size(min = 3)
    private String surname;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @NotNull
    @Temporal(TemporalType.DATE)
    private Date birthDate;

    private String address;
    private String phone;

    @Email
    private String email;

    private Boolean deceased;

    @NotNull
    @Enumerated(EnumType.STRING)
    private MaritalStatus maritalStatus;

    @ManyToOne
    private Organization organization;

    @ManyToOne
    @JsonIgnoreProperties({"organization", "examinations"})
    private Practitioner primaryCareProvider;

    @Size(min = 5)
    @Column(unique = true)
    private String identifier;


    public Patient() {
    }

    public Patient(Long id, Boolean active, String name, String surname, Gender gender, Date birthDate, String address, String phone, String email, Boolean deceased, MaritalStatus maritalStatus, Organization organization, Practitioner primaryCareProvider, String identifier) {
        this.id = id;
        this.active = active;
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.birthDate = birthDate;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.deceased = deceased;
        this.maritalStatus = maritalStatus;
        this.organization = organization;
        this.primaryCareProvider = primaryCareProvider;
        this.identifier = identifier;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getDeceased() {
        return deceased;
    }

    public void setDeceased(Boolean deceased) {
        this.deceased = deceased;
    }

    public MaritalStatus getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(MaritalStatus maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public Practitioner getPrimaryCareProvider() {
        return primaryCareProvider;
    }

    public void setPrimaryCareProvider(Practitioner primaryCareProvider) {
        this.primaryCareProvider = primaryCareProvider;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Patient patient = (Patient) o;
        return Objects.equals(id, patient.id) && Objects.equals(active, patient.active) && Objects.equals(name, patient.name) && Objects.equals(surname, patient.surname) && gender == patient.gender && Objects.equals(birthDate, patient.birthDate) && Objects.equals(address, patient.address) && Objects.equals(phone, patient.phone) && Objects.equals(email, patient.email) && Objects.equals(deceased, patient.deceased) && maritalStatus == patient.maritalStatus && Objects.equals(organization, patient.organization) && Objects.equals(primaryCareProvider, patient.primaryCareProvider) && Objects.equals(identifier, patient.identifier);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, active, name, surname, gender, birthDate, address, phone, email, deceased, maritalStatus, organization, primaryCareProvider, identifier);
    }

    @Override
    public String toString() {
        return "Patient{" +
                "id=" + id +
                ", active=" + active +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", gender=" + gender +
                ", birthDate=" + birthDate +
                ", address='" + address + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", deceased=" + deceased +
                ", maritalStatus=" + maritalStatus +
                ", organization=" + organization +
                ", primaryCareProvider=" + primaryCareProvider +
                ", identifier='" + identifier + '\'' +
                '}';
    }
}
