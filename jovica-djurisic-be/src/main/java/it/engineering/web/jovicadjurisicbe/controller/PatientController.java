package it.engineering.web.jovicadjurisicbe.controller;

import it.engineering.web.jovicadjurisicbe.model.entity.Patient;
import it.engineering.web.jovicadjurisicbe.model.entity.Practitioner;
import it.engineering.web.jovicadjurisicbe.service.ExaminationService;
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

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/patients")
@CrossOrigin
public class PatientController {
    private final PatientService patientService;
    private final ExaminationService examinationService;

    public PatientController(PatientService patientService, ExaminationService examinationService) {
        this.patientService = patientService;
        this.examinationService = examinationService;
    }

    @GetMapping()
    public ResponseEntity<Page<Patient>> findAll(@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "5") int pageSize,
                                                 @RequestParam(defaultValue = "id") String sortBy, @RequestParam(defaultValue = "asc") String sortOrder) {
        Sort.Direction direction = "asc".equalsIgnoreCase(sortOrder) ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(direction, sortBy));
        return ResponseEntity.ok().body(patientService.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPractitioner(@PathVariable Long id) {
        Optional<Patient> patient = patientService.findById(id);
        if (patient.isPresent()) return new ResponseEntity<Patient>(patient.get(), HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Patient> save(@Valid @RequestBody Patient patient) {
        return new ResponseEntity<Patient>(patientService.save(patient), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        Optional<Patient> org = patientService.findById(id);
        if (org.isPresent()) {
            // check if patient has ongoing examinations (number of examinations that are not ENTERED_IN_ERROR, CANCELED, FINISHED)
            if (examinationService.findAllByPatient(id).stream().count() == 0) {
                patientService.deletyById(id);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping()
    public ResponseEntity<Patient> edit(@Valid @RequestBody Patient patient) {
        return ResponseEntity.ok().body(patientService.update(patient));
    }

    @GetMapping("/all")
    public List<Patient> getAll() {
        return patientService.getAll();
    }
}
