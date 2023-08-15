package it.engineering.web.jovicadjurisicbe.repository;

import it.engineering.web.jovicadjurisicbe.model.entity.Patient;
import it.engineering.web.jovicadjurisicbe.model.entity.Practitioner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Page<Patient> findAllByActiveTrue(Pageable pageable);
    List<Patient> findAllByActiveTrue();
    List<Patient> findAllByPrimaryCareProviderId(Long practitionerId);
    List<Patient> findAllByOrganizationId(Long organizationId);
}
