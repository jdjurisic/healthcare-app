package it.engineering.web.jovicadjurisicbe.service;

import it.engineering.web.jovicadjurisicbe.model.entity.Examination;
import it.engineering.web.jovicadjurisicbe.model.entity.Organization;
import it.engineering.web.jovicadjurisicbe.model.entity.Patient;
import it.engineering.web.jovicadjurisicbe.model.entity.Practitioner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ExaminationService {
    Examination save(Examination examination);
    Examination update(Examination examination);
    void deletyById(Long id);
    Optional<Examination> findById(Long id);
    Page<Examination> findAll(Pageable pageable);
    List<Examination> findAllByPatient(Long patient);
    List<Examination> findAllByOrganization(Long organization);

    // dashboard
    List<Object[]> currentlyPerformedExaminataions();
}
