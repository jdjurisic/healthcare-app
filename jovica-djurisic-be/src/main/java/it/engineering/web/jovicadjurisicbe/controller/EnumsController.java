package it.engineering.web.jovicadjurisicbe.controller;

import it.engineering.web.jovicadjurisicbe.model.enums.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/enums")
@CrossOrigin
public class EnumsController {

    @GetMapping("/ex_priorities")
    public ExaminationPriority[] priorities(){
        return ExaminationPriority.values();
    }

    @GetMapping("/ex_status")
    public ExaminationStatus[] statuses(){
        return ExaminationStatus.values();
    }

    @GetMapping("/genders")
    public Gender[] genders(){
        return Gender.values();
    }

    @GetMapping("/marital_status")
    public MaritalStatus[] maritalStatuses(){
        return MaritalStatus.values();
    }

    @GetMapping("/organization_types")
    public OrganizationType[] organizationTypes(){
        return OrganizationType.values();
    }

    @GetMapping("/qualifications")
    public PractitionerQualification[] qualifications(){
        return PractitionerQualification.values();
    }
}
