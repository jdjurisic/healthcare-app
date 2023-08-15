package it.engineering.web.jovicadjurisicbe.controller;

import it.engineering.web.jovicadjurisicbe.model.entity.Examination;
import it.engineering.web.jovicadjurisicbe.model.entity.Organization;
import it.engineering.web.jovicadjurisicbe.model.entity.Patient;
import it.engineering.web.jovicadjurisicbe.model.entity.Practitioner;
import it.engineering.web.jovicadjurisicbe.model.enums.ExaminationStatus;
import it.engineering.web.jovicadjurisicbe.model.enums.PractitionerQualification;
import it.engineering.web.jovicadjurisicbe.service.PatientService;
import it.engineering.web.jovicadjurisicbe.service.PractitionerService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/practitioners")
@CrossOrigin
public class PractitionerController {
    private final PractitionerService practitionerService;
    private final PatientService patientService;

    public PractitionerController(PractitionerService practitionerService, PatientService patientService) {
        this.practitionerService = practitionerService;
        this.patientService = patientService;
    }

    @GetMapping()
    public ResponseEntity<Page<Practitioner>> findAll(@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "5") int pageSize,
                                                      @RequestParam(defaultValue = "id") String sortBy, @RequestParam(defaultValue = "asc") String sortOrder,  @RequestParam(defaultValue = "0") int unemployed) {
        Sort.Direction direction = "asc".equalsIgnoreCase(sortOrder) ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(direction, sortBy));

        Page<Practitioner> practitioners;
        if(unemployed == 0) practitioners = practitionerService.findAll(pageable);
        else practitioners = practitionerService.getAllWithoutOrganization(pageable);
        return ResponseEntity.ok().body(practitioners);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Practitioner> getPractitioner(@PathVariable Long id) {
        Optional<Practitioner> practitioner = practitionerService.findById(id);
        if (practitioner.isPresent()) return new ResponseEntity<Practitioner>(practitioner.get(), HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Practitioner> save(@Valid @RequestBody Practitioner practitioner) {
        return new ResponseEntity<Practitioner>(practitionerService.save(practitioner), HttpStatus.CREATED);
    }

    // possibly Transactional is needed, I'm not sure
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        Optional<Practitioner> pract = practitionerService.findById(id);
        if (!pract.isPresent()) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        // check if theres an active examination for current Practitioner (examinations that are not ENTERED_IN_ERROR, CANCELED, FINISHED)
        for (Examination examination : pract.get().getExaminations()) {
            if (!(examination.getStatus() == ExaminationStatus.ENTERED_IN_ERROR || examination.getStatus() == ExaminationStatus.CANCELLED || examination.getStatus() == ExaminationStatus.FINISHED)){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

        // remove Practitioner from all the Patients
        for(Patient patient : patientService.findAllByPrimaryCareProvider(pract.get().getId())){
            patient.setPrimaryCareProvider(null);
        }

        practitionerService.deletyById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<Practitioner> edit(@Valid @RequestBody Practitioner practitioner) {
        return ResponseEntity.ok().body(practitionerService.update(practitioner));
    }

    @GetMapping("/all")
    public List<Practitioner> getAll() {
        return practitionerService.getAll();
    }

    @GetMapping("/all/{qualification}")
    public List<Practitioner> getAllByQualification(@PathVariable PractitionerQualification qualification) {
        return practitionerService.getAllByQualification(qualification);
    }
}
