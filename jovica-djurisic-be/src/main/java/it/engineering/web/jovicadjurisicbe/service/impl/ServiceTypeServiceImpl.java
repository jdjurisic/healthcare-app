package it.engineering.web.jovicadjurisicbe.service.impl;

import it.engineering.web.jovicadjurisicbe.model.entity.ServiceType;
import it.engineering.web.jovicadjurisicbe.repository.ServiceTypeRepository;
import it.engineering.web.jovicadjurisicbe.service.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ServiceTypeServiceImpl implements ServiceTypeService {
    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    @Override
    public List<ServiceType> getServiceTypes() {
        return serviceTypeRepository.findAll();
    }
}
