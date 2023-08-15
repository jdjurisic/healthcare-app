package it.engineering.web.jovicadjurisicbe.repository;

import it.engineering.web.jovicadjurisicbe.model.entity.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceTypeRepository extends JpaRepository<ServiceType, Long> {
}
