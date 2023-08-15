package it.engineering.web.jovicadjurisicbe.repository;

import it.engineering.web.jovicadjurisicbe.model.entity.Examination;
import it.engineering.web.jovicadjurisicbe.model.entity.Organization;
import it.engineering.web.jovicadjurisicbe.model.entity.Patient;
import it.engineering.web.jovicadjurisicbe.model.entity.Practitioner;
import it.engineering.web.jovicadjurisicbe.model.enums.ExaminationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExaminationRepository extends JpaRepository<Examination, Long> {
    Page<Examination> findAllByStatusNot(ExaminationStatus status, Pageable pageable);
    List<Examination> findAllByPatientIdAndStatusNotIn(Long id, List<ExaminationStatus> statuses);
    List<Examination> findAllByOrganizationId(Long id);

    @Query(value = "SELECT e.organization.name, COUNT(e.id) FROM Examination AS e WHERE e.status = 'IN_PROGRESS' GROUP BY e.organization")
    List<Object[]> countExaminations();
}
