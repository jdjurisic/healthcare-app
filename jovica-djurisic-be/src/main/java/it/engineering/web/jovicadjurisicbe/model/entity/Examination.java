package it.engineering.web.jovicadjurisicbe.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import it.engineering.web.jovicadjurisicbe.model.enums.ExaminationPriority;
import it.engineering.web.jovicadjurisicbe.model.enums.ExaminationStatus;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "examinations")
@SQLDelete(sql = "UPDATE examinations SET status = 'ENTERED_IN_ERROR' WHERE id = ?")
public class Examination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private ExaminationStatus status;

    @NotNull
    @ManyToOne
    private ServiceType serviceType;

    @NotNull
    @Enumerated(EnumType.STRING)
    private ExaminationPriority priority;

    private Date startDate;
    private Date endDate;
    private String diagnosis;

    @ManyToOne
    @NotNull
    private Patient patient;

    @ManyToMany
    @JoinTable(joinColumns = {@JoinColumn(name = "examination_id")},
    inverseJoinColumns = {@JoinColumn(name = "practitioner_id")})
    @JsonIgnoreProperties({"organization", "examinations"})
    private Set<Practitioner> practitioners;

    @ManyToOne
    private Organization organization;


    @Size(min = 5)
    @Column(unique = true)
    private String identifier;


    public Examination() {
    }

    public Examination(Long id, ExaminationStatus status, ServiceType serviceType, ExaminationPriority priority, Date startDate, Date endDate, String diagnosis, Patient patient, Set<Practitioner> practitioners, Organization organization, String identifier) {
        this.id = id;
        this.status = status;
        this.serviceType = serviceType;
        this.priority = priority;
        this.startDate = startDate;
        this.endDate = endDate;
        this.diagnosis = diagnosis;
        this.patient = patient;
        this.practitioners = practitioners;
        this.organization = organization;
        this.identifier = identifier;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
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

    public ExaminationStatus getStatus() {
        return status;
    }

    public void setStatus(ExaminationStatus status) {
        this.status = status;
    }

    public ServiceType getServiceType() {
        return serviceType;
    }

    public void setServiceType(ServiceType serviceType) {
        this.serviceType = serviceType;
    }

    public ExaminationPriority getPriority() {
        return priority;
    }

    public void setPriority(ExaminationPriority priority) {
        this.priority = priority;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public Set<Practitioner> getPractitioners() {
        return practitioners;
    }

    public void setPractitioners(Set<Practitioner> practitioners) {
        this.practitioners = practitioners;
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
        Examination that = (Examination) o;
        return Objects.equals(id, that.id) && status == that.status && Objects.equals(serviceType, that.serviceType) && priority == that.priority && Objects.equals(startDate, that.startDate) && Objects.equals(endDate, that.endDate) && Objects.equals(diagnosis, that.diagnosis) && Objects.equals(practitioners, that.practitioners) && Objects.equals(organization, that.organization) && Objects.equals(identifier, that.identifier);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, status, serviceType, priority, startDate, endDate, diagnosis, practitioners, organization, identifier);
    }

    @Override
    public String toString() {
        return "Examination{" +
                "id=" + id +
                ", status=" + status +
                ", serviceType=" + serviceType +
                ", priority=" + priority +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", diagnosis='" + diagnosis + '\'' +
                ", patient=" + patient +
                ", practitioners=" + practitioners +
                ", organization=" + organization +
                ", identifier='" + identifier + '\'' +
                '}';
    }
}
