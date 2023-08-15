package it.engineering.web.jovicadjurisicbe.service.impl;

import java.util.List;
import java.util.Optional;

import it.engineering.web.jovicadjurisicbe.model.entity.Organization;
import it.engineering.web.jovicadjurisicbe.model.enums.OrganizationType;
import it.engineering.web.jovicadjurisicbe.repository.OrganizationRepository;
import it.engineering.web.jovicadjurisicbe.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import static it.engineering.web.jovicadjurisicbe.specification.OrganizationSpecification.isActive;
import static it.engineering.web.jovicadjurisicbe.specification.OrganizationSpecification.nameContains;

@Service
public class OrganizationServiceImpl implements OrganizationService{
	@Autowired
	private OrganizationRepository organizationRepository;

	@Override
	public Organization save(Organization organization) {
		return organizationRepository.save(organization);
	}

	@Override
	public Organization update(Organization organization) {
		return organizationRepository.save(organization);
	}

	@Override
	public void deleteById(Long id) {
		 organizationRepository.deleteById(id);
	}

	@Override
	public Optional<Organization> findById(Long id) {
		return organizationRepository.findById(id);
	}

	@Override
	public Page<Organization> findAll(Pageable pageable) {
		return organizationRepository.findAllByActiveTrue(pageable);
	}

	@Override
	public Page<Organization> findAll(Pageable pageable, String name) {
		return organizationRepository.findAll(nameContains(name), pageable);
	}

	@Override
	public List<Organization> getAll() {
		return organizationRepository.findAllByActiveTrue();
	}

}
