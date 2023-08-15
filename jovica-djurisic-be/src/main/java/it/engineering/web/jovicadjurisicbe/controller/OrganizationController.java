package it.engineering.web.jovicadjurisicbe.controller;

import it.engineering.web.jovicadjurisicbe.model.entity.Examination;
import it.engineering.web.jovicadjurisicbe.model.entity.Organization;
import it.engineering.web.jovicadjurisicbe.model.entity.Patient;
import it.engineering.web.jovicadjurisicbe.model.entity.Practitioner;
import it.engineering.web.jovicadjurisicbe.model.enums.ExaminationStatus;
import it.engineering.web.jovicadjurisicbe.model.enums.OrganizationType;
import it.engineering.web.jovicadjurisicbe.service.ExaminationService;
import it.engineering.web.jovicadjurisicbe.service.OrganizationService;
import it.engineering.web.jovicadjurisicbe.service.PatientService;
import it.engineering.web.jovicadjurisicbe.service.PractitionerService;
import org.springframework.context.annotation.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/organizations")
@CrossOrigin
public class OrganizationController {
    private final OrganizationService organizationService;
    private final ExaminationService examinationService;
    private final PractitionerService practitionerService;
    private final PatientService patientService;

    public OrganizationController(OrganizationService organizationService, ExaminationService examinationService, PractitionerService practitionerService, PatientService patientService) {
        this.organizationService = organizationService;
        this.examinationService = examinationService;
        this.practitionerService = practitionerService;
        this.patientService = patientService;
    }

    @GetMapping
    public ResponseEntity<Page<Organization>> findAll(@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "5") int pageSize,
                                                      @RequestParam(defaultValue = "name") String sortBy, @RequestParam(defaultValue = "asc") String sortOrder,
                                                      @RequestParam(required = false) String nameFilter) {
        Sort.Direction direction = "asc".equalsIgnoreCase(sortOrder) ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(direction, sortBy));

        if(nameFilter != null) return ResponseEntity.ok().body(organizationService.findAll(pageable, nameFilter));
        return ResponseEntity.ok().body(organizationService.findAll(pageable));
    }


    @GetMapping("/{id}")
    public ResponseEntity<Organization> getOrganization(@PathVariable Long id) {
        Optional<Organization> org = organizationService.findById(id);
        if (org.isPresent()) return new ResponseEntity<Organization>(org.get(), HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Organization> save(@Valid @RequestBody Organization organization) {
        return new ResponseEntity<>(organizationService.save(organization), HttpStatus.CREATED);
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        Optional<Organization> org = organizationService.findById(id);
        if (!org.isPresent()) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        // organization is present ->
        // check if there are running examinations (running != FINISHED, CANCELLED, ENTERED_IN_ERROR)
        List<Examination> examinations = examinationService.findAllByOrganization(id);
        for(Examination exam : examinations){
            if (!(exam.getStatus() == ExaminationStatus.ENTERED_IN_ERROR || exam.getStatus() == ExaminationStatus.CANCELLED || exam.getStatus() == ExaminationStatus.FINISHED)){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

        // no running examinations, proceed to clear Organization from Practitioners and Users
        List<Practitioner> practitioners = practitionerService.findAllByOrganizationId(id);
        for(Practitioner pract : practitioners){
            pract.setOrganization(null);
        }

        List<Patient> patients = patientService.findAllByOrganization(id);
        for(Patient pat : patients){
            pat.setOrganization(null);
        }

        organizationService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<Organization> edit(@Valid @RequestBody Organization organization) {
        System.out.println(organization);
        return ResponseEntity.ok().body(organizationService.update(organization));
    }

    @GetMapping("/all")
    public List<Organization> getAll(){
        return organizationService.getAll();
    }
}
