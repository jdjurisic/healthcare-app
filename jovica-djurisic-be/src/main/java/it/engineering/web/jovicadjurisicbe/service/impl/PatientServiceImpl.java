package it.engineering.web.jovicadjurisicbe.service.impl;

import it.engineering.web.jovicadjurisicbe.model.entity.Patient;
import it.engineering.web.jovicadjurisicbe.model.entity.Practitioner;
import it.engineering.web.jovicadjurisicbe.repository.PatientRepository;
import it.engineering.web.jovicadjurisicbe.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService {
    @Autowired
    private PatientRepository patientRepository;

    @Override
    public Patient save(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public Patient update(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public void deletyById(Long id) {
        patientRepository.deleteById(id);
    }

    @Override
    public Optional<Patient> findById(Long id) {
        return patientRepository.findById(id);
    }

    @Override
    public Page<Patient> findAll(Pageable pageable) {
        return patientRepository.findAllByActiveTrue(pageable);
    }

    @Override
    public List<Patient> getAll() {
        return patientRepository.findAllByActiveTrue();
    }

    @Override
    public List<Patient> findAllByPrimaryCareProvider(Long practitioner) {
        return patientRepository.findAllByPrimaryCareProviderId(practitioner);
    }

    @Override
    public List<Patient> findAllByOrganization(Long organization) {
        return patientRepository.findAllByOrganizationId(organization);
    }
}
