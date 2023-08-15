package it.engineering.web.jovicadjurisicbe.service.impl;

import it.engineering.web.jovicadjurisicbe.model.entity.Examination;
import it.engineering.web.jovicadjurisicbe.model.entity.Organization;
import it.engineering.web.jovicadjurisicbe.model.entity.Patient;
import it.engineering.web.jovicadjurisicbe.model.entity.Practitioner;
import it.engineering.web.jovicadjurisicbe.model.enums.ExaminationStatus;
import it.engineering.web.jovicadjurisicbe.repository.ExaminationRepository;
import it.engineering.web.jovicadjurisicbe.service.ExaminationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ExaminationServiceImpl implements ExaminationService {
    @Autowired
    private ExaminationRepository examinationRepository;

    @Override
    public Examination save(Examination examination) {
        return examinationRepository.save(examination);
    }

    @Override
    public Examination update(Examination examination) {
        return examinationRepository.save(examination);
    }

    @Override
    public void deletyById(Long id) {
        examinationRepository.deleteById(id);
    }

    @Override
    public Optional<Examination> findById(Long id) {
        return examinationRepository.findById(id);
    }

    @Override
    public Page<Examination> findAll(Pageable pageable) {
        return examinationRepository.findAllByStatusNot(ExaminationStatus.ENTERED_IN_ERROR,pageable);
    }

    @Override
    public List<Examination> findAllByPatient(Long patientId) {
        List<ExaminationStatus> statuses = new ArrayList<>();
        statuses.add(ExaminationStatus.ENTERED_IN_ERROR);
        statuses.add(ExaminationStatus.CANCELLED);
        statuses.add(ExaminationStatus.FINISHED);
        return examinationRepository.findAllByPatientIdAndStatusNotIn(patientId, statuses);
    }

    @Override
    public List<Examination> findAllByOrganization(Long organizationId) {
        return examinationRepository.findAllByOrganizationId(organizationId);
    }

    @Override
    public List<Object[]> currentlyPerformedExaminataions() {
        return examinationRepository.countExaminations();
    }


}
