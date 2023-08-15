package it.engineering.web.jovicadjurisicbe.repository;

import it.engineering.web.jovicadjurisicbe.model.entity.Organization;
import it.engineering.web.jovicadjurisicbe.model.entity.Patient;
import it.engineering.web.jovicadjurisicbe.model.entity.Practitioner;
import it.engineering.web.jovicadjurisicbe.model.enums.OrganizationType;
import it.engineering.web.jovicadjurisicbe.model.enums.PractitionerQualification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PractitionerRepository extends JpaRepository<Practitioner, Long> {
    Page<Practitioner> findAllByActiveTrue(Pageable pageable);
    Page<Practitioner> findAllByOrganizationNull(Pageable pageable);
    List<Practitioner> findAllByActiveTrue();
    List<Practitioner> findAllByQualificationAndActiveTrue(PractitionerQualification practitionerQualification);
    List<Practitioner> findAllByOrganizationId(Long organizationId);

    @Query(value = "SELECT p.organization.name, COUNT(p.id) FROM Practitioner AS p WHERE p.active = true GROUP BY p.organization")
    List<Object[]> countPractitioners();

    @Query(value = "SELECT p.qualification, COUNT(p.id) FROM Practitioner AS p WHERE p.active = true GROUP BY p.qualification")
    List<Object[]> countPractitionersByQualification();
}
