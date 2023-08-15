package it.engineering.web.jovicadjurisicbe.service;

import it.engineering.web.jovicadjurisicbe.model.entity.Patient;
import it.engineering.web.jovicadjurisicbe.model.entity.Practitioner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface PatientService {
    Patient save(Patient patient);
    Patient update(Patient patient);
    void deletyById(Long id);
    Optional<Patient> findById(Long id);
    Page<Patient> findAll(Pageable pageable);
    List<Patient> getAll();
    List<Patient> findAllByPrimaryCareProvider(Long practitioner);
    List<Patient> findAllByOrganization(Long organization);
}
