package it.engineering.web.jovicadjurisicbe.controller;

import it.engineering.web.jovicadjurisicbe.service.ExaminationService;
import it.engineering.web.jovicadjurisicbe.service.OrganizationService;
import it.engineering.web.jovicadjurisicbe.service.PatientService;
import it.engineering.web.jovicadjurisicbe.service.PractitionerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin
public class DashboardController {
    private final OrganizationService organizationService;
    private final ExaminationService examinationService;
    private final PractitionerService practitionerService;
    private final PatientService patientService;

    public DashboardController(OrganizationService organizationService, ExaminationService examinationService, PractitionerService practitionerService, PatientService patientService) {
        this.organizationService = organizationService;
        this.examinationService = examinationService;
        this.practitionerService = practitionerService;
        this.patientService = patientService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getDashboardData(){
        Map<String, Object> map = new HashMap<>();

        map.put("Practitioners", practitionerService.countPractitioners());
        map.put("Examinations", examinationService.currentlyPerformedExaminataions());
        map.put("Qualifications", practitionerService.countPractitionrsByQualification());

        return ResponseEntity.ok().body(map);
    }
}

