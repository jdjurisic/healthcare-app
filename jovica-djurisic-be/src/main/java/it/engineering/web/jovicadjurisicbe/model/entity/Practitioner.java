package it.engineering.web.jovicadjurisicbe.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import it.engineering.web.jovicadjurisicbe.model.enums.Gender;
import it.engineering.web.jovicadjurisicbe.model.enums.PractitionerQualification;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity

@Table(name = "practitioners")
@SQLDelete(sql = "UPDATE practitioners SET active = 0 WHERE id = ?")
//@Where(clause = "active=1")
public class Practitioner {

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

    @NotNull
    @Enumerated(EnumType.STRING)
    private PractitionerQualification qualification;

    @ManyToOne
    private Organization organization;

    @Size(min = 5)
    @Column(unique = true)
    private String identifier;

    @ManyToMany(mappedBy = "practitioners" )
    @JsonIgnoreProperties({"patient", "practitioners"})
    private Set<Examination> examinations;

    public Practitioner() {
    }

    public Practitioner(Long id, Boolean active, String name, String surname, Gender gender, Date birthDate, String address, String phone, String email, PractitionerQualification qualification, Organization organization, String identifier, Set<Examination> examinations) {
        this.id = id;
        this.active = active;
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.birthDate = birthDate;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.qualification = qualification;
        this.organization = organization;
        this.identifier = identifier;
        this.examinations = examinations;
    }

    public Set<Examination> getExaminations() {
        return examinations;
    }

    public void setExaminations(Set<Examination> examinations) {
        this.examinations = examinations;
    }

    public void addExamination(Examination examination){
        this.examinations.add(examination);
        examination.getPractitioners().add(this);
    }

    public void removeExamination(Examination examination){
        this.examinations.remove(examination);
        examination.getPractitioners().remove(this);
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

    public PractitionerQualification getQualification() {
        return qualification;
    }

    public void setQualification(PractitionerQualification qualification) {
        this.qualification = qualification;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Practitioner that = (Practitioner) o;
        return Objects.equals(id, that.id) && Objects.equals(active, that.active) && Objects.equals(name, that.name) && Objects.equals(surname, that.surname) && gender == that.gender && Objects.equals(birthDate, that.birthDate) && Objects.equals(address, that.address) && Objects.equals(phone, that.phone) && Objects.equals(email, that.email) && qualification == that.qualification && Objects.equals(organization, that.organization) && Objects.equals(identifier, that.identifier);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, active, name, surname, gender, birthDate, address, phone, email, qualification, organization, identifier);
    }
}
