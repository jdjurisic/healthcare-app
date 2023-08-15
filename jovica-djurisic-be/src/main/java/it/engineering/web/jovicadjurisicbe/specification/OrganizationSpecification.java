package it.engineering.web.jovicadjurisicbe.specification;

import it.engineering.web.jovicadjurisicbe.model.entity.Organization;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class OrganizationSpecification {


    public static Specification<Organization> nameContains(String name) {
        return (org, cq, cb) -> cb.like(org.get("name"), "%" + name + "%");
    }

    public static Specification<Organization> isActive(boolean act) {
        return (org, cq, cb) -> cb.equal(org.get("active"), true);
    }
}

//    public static Specification<Organization> containsName(String name){
//        return ((root, criteriaQuery, criteriaBuilder) -> {
//            return criteriaBuilder.equal(root.get(Organization),firstname);
//        });
//    }
//}
//
//    public static Specification<Employee> hasFirstName(String firstname){
//        return ((root, criteriaQuery, criteriaBuilder) -> {
//            return criteriaBuilder.equal(root.get(Employee_.FIRSTNAME),firstname);
//        });
//    }
//    public static Specification<Employee> containsLastName(String lastname){
//        return ((root, criteriaQuery, criteriaBuilder) -> {
//            return criteriaBuilder.like(root.get(Employee_.LASTNAME),"%"+ lastname + "%");
//        });
//    }
//
//    public static Specification<Employee> hasDepartment(String department){
//        return ((root, criteriaQuery, criteriaBuilder) -> {
//            return criteriaBuilder.equal(root.get(Employee_.DEPARTMENT),department);
//        });
