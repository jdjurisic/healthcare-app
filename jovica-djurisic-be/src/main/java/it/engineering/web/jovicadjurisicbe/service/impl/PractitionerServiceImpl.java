package it.engineering.web.jovicadjurisicbe.service.impl;

import it.engineering.web.jovicadjurisicbe.model.entity.Organization;
import it.engineering.web.jovicadjurisicbe.model.entity.Practitioner;
import it.engineering.web.jovicadjurisicbe.model.enums.PractitionerQualification;
import it.engineering.web.jovicadjurisicbe.repository.PractitionerRepository;
import it.engineering.web.jovicadjurisicbe.service.PractitionerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PractitionerServiceImpl implements PractitionerService {
    @Autowired
    private PractitionerRepository practitionerRepository;

    @Override
    public Practitioner save(Practitioner practitioner) {
        return practitionerRepository.save(practitioner);
    }

    @Override
    public Practitioner update(Practitioner practitioner) {
        return practitionerRepository.save(practitioner);
    }

    @Override
    public void deletyById(Long id) {
        practitionerRepository.deleteById(id);
    }

    @Override
    public Optional<Practitioner> findById(Long id) {
        return practitionerRepository.findById(id);
    }

    @Override
    public Page<Practitioner> findAll(Pageable pageable) {
        return practitionerRepository.findAllByActiveTrue(pageable);
    }

    @Override
    public List<Practitioner> getAll() {
        return practitionerRepository.findAllByActiveTrue();
    }

    @Override
    public List<Practitioner> getAllByQualification(PractitionerQualification practitionerQualification) {
        return practitionerRepository.findAllByQualificationAndActiveTrue(practitionerQualification);
    }

    @Override
    public Page<Practitioner> getAllWithoutOrganization(Pageable pageable) {
        return practitionerRepository.findAllByOrganizationNull(pageable);
    }

    @Override
    public List<Practitioner> findAllByOrganizationId(Long id) {
        return practitionerRepository.findAllByOrganizationId(id);
    }

    @Override
    public List<Object[]> countPractitioners() {
        return practitionerRepository.countPractitioners();
    }

    @Override
    public List<Object[]> countPractitionrsByQualification() {
        return practitionerRepository.countPractitionersByQualification();
    }


}
