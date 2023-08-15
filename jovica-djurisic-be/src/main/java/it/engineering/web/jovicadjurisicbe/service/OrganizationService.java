package it.engineering.web.jovicadjurisicbe.service;

import java.util.List;
import java.util.Optional;

import it.engineering.web.jovicadjurisicbe.model.entity.Organization;
import it.engineering.web.jovicadjurisicbe.model.enums.OrganizationType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrganizationService {
	
	Organization save(Organization organization);
	Organization update(Organization organization);
	void deleteById(Long id);
	Optional<Organization> findById(Long id);
	Page<Organization> findAll(Pageable pageable);
	Page<Organization> findAll(Pageable pageable, String name);
	List<Organization> getAll();
}
