package it.engineering.web.jovicadjurisicbe.service;

import it.engineering.web.jovicadjurisicbe.model.entity.Organization;
import it.engineering.web.jovicadjurisicbe.model.entity.Practitioner;
import it.engineering.web.jovicadjurisicbe.model.enums.PractitionerQualification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface PractitionerService {
    Practitioner save(Practitioner practitioner);
    Practitioner update(Practitioner practitioner);
    void deletyById(Long id);
    Optional<Practitioner> findById(Long id);
    Page<Practitioner> findAll(Pageable pageable);
    List<Practitioner> getAll();
    List<Practitioner> getAllByQualification(PractitionerQualification practitionerQualification);
    Page<Practitioner> getAllWithoutOrganization(Pageable pageable);
    List<Practitioner> findAllByOrganizationId(Long id);

    // dashboard
    List<Object[]> countPractitioners();
    List<Object[]> countPractitionrsByQualification();
}
