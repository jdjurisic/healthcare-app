package it.engineering.web.jovicadjurisicbe.controller;

import it.engineering.web.jovicadjurisicbe.model.entity.Examination;
import it.engineering.web.jovicadjurisicbe.model.entity.Practitioner;
import it.engineering.web.jovicadjurisicbe.service.ExaminationService;
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
@RequestMapping("/examinations")
@CrossOrigin
public class ExaminationController {
    private final ExaminationService examinationService;

    public ExaminationController(ExaminationService examinationService) {
        this.examinationService = examinationService;
    }

    @GetMapping()
    public ResponseEntity<Page<Examination>> findAll(@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "5") int pageSize,
                                                     @RequestParam(defaultValue = "id") String sortBy, @RequestParam(defaultValue = "asc") String sortOrder) {
        Sort.Direction direction = "asc".equalsIgnoreCase(sortOrder) ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(direction, sortBy));
        return ResponseEntity.ok().body(examinationService.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Examination> getExamination(@PathVariable Long id) {
        Optional<Examination> examination = examinationService.findById(id);
        if (examination.isPresent()) return new ResponseEntity<Examination>(examination.get(), HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Examination> save(@Valid @RequestBody Examination examination) {
        return new ResponseEntity<Examination>(examinationService.save(examination), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        Optional<Examination> exam = examinationService.findById(id);
        if (exam.isPresent()) {
            examinationService.deletyById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping()
    public ResponseEntity<Examination> edit(@Valid @RequestBody Examination examination) {
        return ResponseEntity.ok().body(examinationService.update(examination));
    }

    // NON CRUD PART, ROUTES BELOW ARE USED FOR DETAILS AND OTHER USEFUL INFOS
    @GetMapping("/patient/{id}")
    public ResponseEntity<List<Examination>> getExaminationByPatient(@PathVariable Long id) {
        return new ResponseEntity<List<Examination>>(examinationService.findAllByPatient(id), HttpStatus.OK);
    }

    @GetMapping("/organization/{id}")
    public ResponseEntity<List<Examination>> getExaminationByOrganization(@PathVariable Long id) {
        return new ResponseEntity<List<Examination>>(examinationService.findAllByOrganization(id), HttpStatus.OK);
    }
}
