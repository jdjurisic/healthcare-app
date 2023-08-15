package it.engineering.web.jovicadjurisicbe.controller;

import it.engineering.web.jovicadjurisicbe.model.entity.ServiceType;
import it.engineering.web.jovicadjurisicbe.service.ServiceTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/service_types")
@CrossOrigin
public class ServiceTypeController {
    private final ServiceTypeService serviceTypeService;

    public ServiceTypeController(ServiceTypeService serviceTypeService) {
        this.serviceTypeService = serviceTypeService;
    }

    @GetMapping()
    public ResponseEntity<List<ServiceType>> getServiceTypes(){
        return ResponseEntity.ok().body(serviceTypeService.getServiceTypes());
    }
}